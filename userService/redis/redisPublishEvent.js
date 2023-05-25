const redisClient = require('./connectRedis')

//call when register user
const createUserEvent = async (user) => {
  await redisClient.publish('create_user', JSON.stringify(user))
}

module.exports = {
  createUserEvent: createUserEvent,
}