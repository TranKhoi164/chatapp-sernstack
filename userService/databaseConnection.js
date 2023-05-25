const {Sequelize} = require('sequelize')

const sequelize = new Sequelize('chatapp_user', 'root', null, {
  host: process.env.MYSQL_HOST || 'localhost',
  dialect: 'mysql',
  logging: false,
  port: process.env.MYSQL_PORT || 3306
});
exports.sequelize = sequelize

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

connectDB()