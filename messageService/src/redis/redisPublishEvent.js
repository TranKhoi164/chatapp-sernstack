const {publisher} = require('./connectRedis')

publisher.on('error', (err) => console.log('Publisher client error: ', err))

publisher.connect()
publisher.on('connect', () => console.log('Publisher connect on ', process.env.REDIS_URL))

//message obj contain id, content, chat
const createMessageEvent = async (message) => {
  await publisher.publish('create_message', JSON.stringify(message))
}

module.exports = {
  createMessageEvent: createMessageEvent
}