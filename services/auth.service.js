const boom=require('@hapi/boom');
const nodemailer=require("nodemailer");

const { configEmail } = require('./../config/configEmail');

const userService = require('./user.service');

const { comparePassword, hasPassword } = require('./../helper/passwordHas.helper');
const { singToken, verifyTokent }=require('./../helper/jwt.helper');


const service = new userService();

class AuthService {

  async getUser(email, password) {
    const user = await service.findByEmail(email);

    if (!user) {
      throw boom.unauthorized("It's user not found");
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      throw boom.unauthorized("It's password not macht");
    }
    delete user.dataValues.password;
    return user;
  }

  signToken(user) {
    const { id, role } = user;
    const payload = { sub:id, role };
    const jwt = singToken(payload);
    return {
      user,
      "token":jwt
    };
  }

  async sendRecovery(email){
    const user = await service.findByEmail(email);
    if (!user) {
      throw boom.unauthorized("It's not found user");
    }
    const payload ={ sub:user.id }
    const token =singToken(payload,{expiresIn:'15min'});
    const link=`http://myfrontend.com/recovery?token=${token}`;
    await service.update(user.id,{recoveryToken:token});
    const mail={
      from: "arjun.hagenes@ethereal.email",
      to: `arjun.hagenes@ethereal.email`,
      subject: "Email para recuperar contraseña",
      html:`<b>Ingresa a este link => ${link} </b>`
    };
    const rta=await this.sendMail(mail);
    return rta;
  }

  async sendMail(infoMail) {
    const transporter = nodemailer.createTransport(configEmail);
    await transporter.sendMail(infoMail);
    return {massage:'mail sent'}
  }

  async changePassword(token,newPassword){
    try {
      const payload=verifyTokent(token);
      const user = await service.findOne(payload.sub);
      if(token !== user.recoveryToken){
        throw  boom.unauthorized();
      }
      const hash = await hasPassword(newPassword);
      await service.update(user.id,{ recoveryToken:"",password:hash });
      return {message:'password changed'};
    } catch(e) {
      throw  boom.unauthorized();
    }
  }
}

module.exports = AuthService;
