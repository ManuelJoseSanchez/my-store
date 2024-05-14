const boom=require('@hapi/boom');
const nodemailer=require("nodemailer");

const { configEmail } = require('./../config/configEmail');

const userService = require('./user.service');

const { comparePassword } = require('./../helper/passwordHas.helper');
const { singToken }=require('./../helper/jwt.helper');


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

  async sendMail(email) {
    const user = await service.findByEmail(email);
    if (!user) {
      throw boom.unauthorized("It's not found user");
    }
    console.log(configEmail);
    const transporter = nodemailer.createTransport(configEmail);
    await transporter.sendMail({
      from: "willis.schulist@ethereal.email",
      to: `willis.schulist@ethereal.email`,
      subject: "It's sent a new email",
      text: "Hello manuel",
      html:"<b>Hello manuel</b>"
    });
    return {massage:'mail sent'}
  }
}

module.exports = AuthService;
