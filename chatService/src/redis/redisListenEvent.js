
const { User, Message, Chat } = require('../DBconnection')
const {subscriber} = require('./connectRedis')

subscriber.on('error', (err) => console.log('Subscriber client error: ', err))

subscriber.connect()
subscriber.on('connect', () => console.log('Subscriber connect on ', process.env.REDIS_URL))

//userObj contain name, picture
subscriber.subscribe('create_user', async (user) => {
  try {
    const userObj = JSON.parse(user)
    await User.create(userObj)
  } catch (e) {
    throw new Error(e)
  }
})

//it take id, content, userId, chatId
subscriber.subscribe('create_message', async (message) => {
  try {
    const msgObj = JSON.parse(message)
    const msg = await Message.create(msgObj)
    Chat.update(
      {updatedAt: msg.createdAt},
      {where: {id: msgObj.chatId}}
    ).catch(e => {throw new Error(e)})
  } catch (e) {
    throw new Error(e)
  }
})