const { Message, User } = require("../DBconnection")
const { createMessageEvent } = require("../redis/redisPublishEvent")
const handleExceptions = require("../utils/handleExceptions")


const createMessage = async (req, res) => {
  try {
    //its gonna take chatId, content
    const {chatId, content} = req.body.message
      const msg = await Message.create(
        {...req.body.message, useId: req.body.userId},
      )

      const newMessage = await Message.findOne({
        where: {id: msg.id}, 
        include: User
      })

      createMessageEvent({id: newMessage.id, userId: req.body.userId, chatId: chatId, content: content})
      return res.json({message: newMessage})

  } catch (e) {
    handleExceptions(500, e.message, res)
  }
}

const getMessages = async (req, res) => {
  try {
    const {chatId} = req.query
    const messages = await Message.findAll({
      where: {chatId: chatId},
      include: User
    })
    res.json({messages: messages})
  } catch (e) {
    handleExceptions(500, e.message, res)
  }
}

module.exports = {
  createMessage: createMessage,
  getMessages: getMessages
}