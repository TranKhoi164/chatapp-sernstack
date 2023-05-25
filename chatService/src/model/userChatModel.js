const {DataTypes, Model} = require('sequelize');

module.exports = (sequelize, User, Chat) => {
 try {
  class UserChat extends Model {}

  UserChat.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
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
  }, {
    // Other model options go here
    timestamps: false,
    sequelize, // We need to pass the connection instance
    modelName: 'UserChat' // We need to choose the model name
  });
  return UserChat
 } catch (e) {
  throw new Error(e)
 }
}


// module.exports = (sequelize, DataTypes) => {
//   return sequelize.define('userchat', {
//     id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       primaryKey: true
//     },
//   }, {
//     timestamps: false
//   });
// }