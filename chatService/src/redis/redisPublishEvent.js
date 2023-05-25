
const { User, Message } = require('../DBconnection')
const {publisher} = require('./connectRedis')

publisher.on('error', (err) => console.log('Publisher client error: ', err))

publisher.connect()
publisher.on('connect', () => console.log('Publisher connect on ', process.env.REDIS_URL))

//take only chatId
const createChatEvent = async (chat) => {
  await publisher.publish("create_chat", JSON.stringify(chat))
}

module.exports = {
  createChatEvent: createChatEvent
}