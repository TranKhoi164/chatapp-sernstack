const {DataTypes, Model} = require('sequelize');
const { User, Chat } = require('../DBconnection');


module.exports = (sequelize) => {
  try {
    class Message extends Model {}

    Message.init({
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: User,
          key: 'id'
        }
      },
      chatId: {
        type: DataTypes.INTEGER,
        references: {
          model: Chat,
          key: 'id'
        }
      },
      content: {
        type:DataTypes.STRING
      }
    }, {
      // Other model options go here
      timestamps: true,
      sequelize, // We need to pass the connection instance
      modelName: 'Message' // We need to choose the model name
    });

    return Message
  } catch (e) {
    throw new Error(e)
  }
}
