
const { User, Chat } = require('../DBconnection')
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

subscriber.subscribe('create_chat', async (chat) => {
  try {
    const chatObj = JSON.parse(chat)
    await Chat.create(chatObj)
  } catch (e) {
    throw new Error(e)
  }
})