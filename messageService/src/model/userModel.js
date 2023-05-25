const {DataTypes, Model} = require('sequelize');

module.exports = (sequelize) => {
  try {
    class User extends Model {}

    // Chat.belongsToMany(User, {through: UserChat, foreignKey: 'chatId'})
    // User.belongsToMany(Chat, {through: UserChat, foreignKey: 'userId'})

    User.init({
      name: {
        type: DataTypes.STRING,
      },
      picture: {
        type: DataTypes.STRING
      }
    }, {
      // Other model options go here
      timestamps: false,
      sequelize, // We need to pass the connection instance
      modelName: 'User' // We need to choose the model name
    });


    return User
  } catch (e) {
    throw new Error(e)
  }
}