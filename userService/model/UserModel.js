const {sequelize} = require('../databaseConnection');
const {DataTypes} = require('sequelize');

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  picture: {
    type: DataTypes.STRING,
  }
}, {
  timestamps: false
});

(async () => {
  await User.sync({ alter: true })
})();

module.exports = User