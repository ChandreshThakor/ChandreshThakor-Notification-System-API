const path = require('path');

module.exports = {
  development: {
    username: 'postgres',
    password: 'password',
    database: 'chat_app',
    host: '127.0.0.1',
    dialect: 'postgres',
    models: [path.resolve(__dirname, '../src/model')]
  }
};