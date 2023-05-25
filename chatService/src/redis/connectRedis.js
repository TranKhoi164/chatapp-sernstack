const redis = require('redis')
const {REDIS_URL, REDIS_HOST, REDIS_PORT} = process.env


let publisher, subscriber

console.log('reids: ', REDIS_HOST + ' ' + REDIS_PORT);

if (!REDIS_URL) {
  publisher = redis.createClient({
    legacyMode: true,
    socket: {
      port: REDIS_PORT,
      host: REDIS_HOST,
    }
  })  
  subscriber = redis.createClient({
    legacyMode: true,
    socket: {
      port: REDIS_PORT,
      host: REDIS_HOST,
    }
  })  
} else {
  publisher = redis.createClient({
    url: REDIS_URL
  })  
  subscriber = redis.createClient({
    url: REDIS_URL
  })  
}


// const subscriber = redis.createClient({url: process.env.REDIS_URL})
// const publisher = redis.createClient({url: process.env.REDIS_URL})


module.exports = {
  subscriber: subscriber,
  publisher: publisher
}