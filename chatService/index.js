require('dotenv').config()
require('./src/DBconnection')
const express = require('express')
const cors = require('cors')
const app = express()
//Routes
const chatRoutes = require('./src/routes/chatRoutes')
//Socket server initialize

app.use(cors({
  origin: process.env.CLIENT_URL,
}))
app.use(express.json())
app.use('/chat', chatRoutes)

require('./src/redis/redisListenEvent')


//server running
const PORT = process.env.PORT || 5001
app.listen(PORT, () => {
  console.log('chatService is running on port: ', PORT);
})