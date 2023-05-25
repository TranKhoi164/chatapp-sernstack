const {DataTypes, Model} = require('sequelize');
const { Chat, User } = require('../DBconnection');

module.exports = (sequelize) => {
  try {
    class Message extends Model {}

    // Chat.belongsToMany(User, {through: UserChat, foreignKey: 'chatId'})
    // User.belongsToMany(Chat, {through: UserChat, foreignKey: 'userId'})

    Message.init({
      content: {
        type: DataTypes.STRING,
      },
      chatId: {
        type: DataTypes.INTEGER,
        references: {
          model: Chat,
          key: 'id'
        }
      },
      //sender id
      userId: {
        type: DataTypes.INTEGER,
        references: User,
        key: 'id'
      }
    }, {
      // Other model options go here
      timestamps: false,
      sequelize, // We need to pass the connection instance
      modelName: 'Message' // We need to choose the model name
    });


    return Message
  } catch (e) {
    throw new Error(e)
  }
}