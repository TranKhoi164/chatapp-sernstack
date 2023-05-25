const redis = require('redis')
const {REDIS_URL, REDIS_HOST, REDIS_PORT} = process.env

let redisClient
if (!REDIS_URL) {
  redisClient = redis.createClient({
    legacyMode: true,
    socket: {
      port: Number(REDIS_PORT),
      host: String(REDIS_HOST),
    }
  })  
} else {
  redisClient = redis.createClient({
    url: REDIS_URL
  })  
}


// const redisClient = redis.createClient({url: process.env.REDIS_URL})

redisClient.on('error', (err) => console.log('Redis client error: ', err))

redisClient.connect()
redisClient.on('connect', () => console.log('Client connect on ', process.env.REDIS_URL))

module.exports = redisClient