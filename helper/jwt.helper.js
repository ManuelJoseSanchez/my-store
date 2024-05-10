const jwt = require('jsonwebtoken');

const  { config }= require('./../config/config');

const scret = config.keySecret;

function singToken(playload) {
  return jwt.sign(playload, scret);
}

module.exports={ singToken }

