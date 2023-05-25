const {DataTypes, Model} = require('sequelize');
const { Message } = require('../DBconnection');

module.exports = (sequelize) => {
  try {
    class Chat extends Model {}

    // Chat.belongsToMany(User, {through: UserChat, foreignKey: 'chatId'})
    // User.belongsToMany(Chat, {through: UserChat, foreignKey: 'userId'})

    Chat.init({
      name: {
        type: DataTypes.STRING,
      },
      isGroup: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      groupAdminId: {
        type: DataTypes.INTEGER
      },
    }, {
      // Other model options go here
      timestamps: true,
      sequelize, // We need to pass the connection instance
      modelName: 'Chat' // We need to choose the model name
    });


    return Chat
  } catch (e) {
    throw new Error(e)
  }
}