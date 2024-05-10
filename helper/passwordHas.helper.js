const bcrypt = require('bcrypt');

const saltRounds = 10;

async function hasPassword(password) {
  const passwordhas = await bcrypt.hash(password, saltRounds);
  return passwordhas;
}


async function comparePassword(password, hash) {
  const match = await bcrypt.compare(password, hash);
  return match;
}


module.exports = {
  hasPassword,
  comparePassword,
}
