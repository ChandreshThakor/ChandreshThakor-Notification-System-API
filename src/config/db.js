const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false,
  models: [path.join(__dirname, '../src/model')], 
});

module.exports = sequelize;
