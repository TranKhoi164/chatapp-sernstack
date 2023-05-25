const {Sequelize, DataTypes, Model} = require('sequelize')
// const Chat = require('./model/chatModel');
// const Message = require('./model/messageModel');

const sequelize = new Sequelize('chatapp_chat', 'root', null, {
  host: process.env.MYSQL_HOST || 'localhost',
  dialect: 'mysql',
  logging: false,
  port: process.env.MYSQL_PORT || 3306
});
exports.sequelize = sequelize

const Chat = require('./model/chatModel')(sequelize)
const Message = require('./model/messageModel')(sequelize)
const User = require('./model/userModel')(sequelize)

const UserChat = require('./model/userChatModel')(sequelize, User, Chat)


Chat.hasMany(Message, {foreignKey: 'chatId'})
Message.belongsTo(Chat, {foreignKey: 'chatId'})

User.hasMany(Message, {foreignKey: 'userId'})
Message.belongsTo(User, {foreignKey: 'userId'})

Chat.belongsToMany(User, {through: UserChat, foreignKey: 'chatId'})
User.belongsToMany(Chat, {through: UserChat, foreignKey: 'userId'})




const connectDB = async () => {
  try {
    console.log(process.env.MYSQL_PORT);
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    await sequelize.sync({alter: true}).catch(e => {throw new Error(e)})
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

connectDB()
module.exports = {
  sequelize: sequelize,
  Chat: Chat,
  Message: Message, 
  User: User,
  UserChat: UserChat
}

// module.exports = db//   try {
