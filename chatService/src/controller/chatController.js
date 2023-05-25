const { Chat, UserChat, User, Message } = require("../DBconnection")
const { createChatEvent } = require("../redis/redisPublishEvent")
const handleExceptions = require("../utils/handleExceptions")

const getChats = async (req, res) => {
  try {
    const {userId} = req.body
    
    const chats = await User.findOne({
      where: {id: userId},
      include: [
        {
          model: Chat,
          include: [
            {
              model: User
            },
          ],
        },

      ],
      // attributes: ['Chats']
    })
    res.json({chats: chats.Chats})
  } catch (e) {
    handleExceptions(500, e.message, res)
  }
}

// const createUserChats = async (users, chatId) => {
//   let userChatsData = []

//   for(let i = 0; i < users.length; i++) {
//     userChatsData.push({userId: users[i], chatId: chatId})
//   }

//   UserChat.bulkCreate(userChatsData).catch(e => { throw new Error(e) })
// }

const createChat = async (req, res) => {
  try {
    //users is arr of user id, gpAdmin is also id
    const {name, isGroup, users, groupAdminId} = req.body.chat
    const newChat = await Chat.create({name, isGroup, groupAdminId})
    // await newChat.save()

    // users.map(async user => {
    //   try {
    //     console.log(user);
    //     await UserChat.create({userId: parseInt(user), chatId: parseInt(newChat.id)})
    //   } catch (e) {
    //     handleExceptions(500, e.message, res)
    //   }
    // })
    let userChatsData = []

    for(let i = 0; i < users.length; i++) {
      userChatsData.push({userId: users[i], chatId: newChat.id})
    }

    UserChat.bulkCreate(userChatsData)
    .then(async () => {
      createChatEvent({id: newChat.id})
      res.json({chat: newChat})
    })
    .catch(e => { handleExceptions(500, e.message, res) })
  } catch (e) {
    handleExceptions(500, e.message, res)
  }
}

module.exports = {
  getChats: getChats,
  createChat: createChat
}