const { Strategy } = require('passport-local');
const boom=require('@hapi/boom');

const { comparePassword }=require('./../../../helper/passwordHas.helper');
const userService = require('./../../../services/user.service');

const service = new userService();

const LocalStrategy = new Strategy({
  usernameField: "email",
  passwordField: "password"
}, async (email, password, done) => {
    console.log("holas");
    try {
      const user = await service.findByEmail(email);
      if (!user) {
        done(boom.unauthorized(),false);
      }
      const isMatch = await comparePassword(password, user.password);
      if (!isMatch) {
        done(boom.unauthorized(),false);
      }
      delete user.dataValues.password;
      done(null, user);
    } catch (error) {
      done(error, false);
    }
});

module.exports = LocalStrategy;
