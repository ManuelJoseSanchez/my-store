const boom = require('@hapi/boom');
const getConnection = require('../libs/postgres');

class UserService {
  constructor() { }

  async find() {
    const client = await getConnection();
    const result = await client.query(`SELECT * FROM tasks`);
    return result.rows;
  }
}

module.exports = UserService;
