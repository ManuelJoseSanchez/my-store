const jwt = require('jsonwebtoken');

const  { config }= require('./../config/config');

const scret = config.keySecret;

function singToken(playload,options={}) {
  return jwt.sign(playload, scret,options);
}

function verifyTokent(token) {
  return jwt.verify(token,scret);
}

module.exports={ singToken, verifyTokent }

