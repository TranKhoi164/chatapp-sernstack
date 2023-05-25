const {DataTypes, Model} = require('sequelize');

module.exports = (sequelize) => {
  try {
    class Chat extends Model {}

    // Chat.belongsToMany(User, {through: UserChat, foreignKey: 'chatId'})
    // User.belongsToMany(Chat, {through: UserChat, foreignKey: 'userId'})

    Chat.init({
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      }
    }, {
      // Other model options go here
      timestamps: false,
      sequelize, // We need to pass the connection instance
      modelName: 'Chat' // We need to choose the model name
    });


    return Chat
  } catch (e) {
    throw new Error(e)
  }
}