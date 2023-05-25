require('dotenv').config()
require('./src/DBconnection')
const express = require('express')
const cors = require('cors')
const app = express()
//Routes
const messageRoutes = require('./src/routes/messageRoutes')
//Socket server initialize
const http = require('http')
const server = http.createServer(app)

const {Server} = require('socket.io')

const io = new Server(server, {
  path: '/message/socket',
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PATCH", "DELETE"]
  },
})


app.use(cors({
  origin: process.env.CLIENT_URL,
}))
app.use(express.json())
app.use('/message', messageRoutes)

require('./src/redis/redisListenEvent')



io.on("connection", (socket) => {
  console.log('Connected to socketio:', socket.id);

  //its context.userObj
  socket.on('setup', (userData) => {
    socket.join(userData.id)
    socket.emit('connected')
  })

  //take chatId
  socket.on('join chat', (room) => {
    socket.join(room)
    console.log('User joined Room: ' + room);
  })
  //contain chat data, message data
  socket.on('new_msg', (messageData) => {
    const chat = messageData.chat
    const newMessage = messageData.newMessage  
    console.log('test msg send');

    if (!chat.Users) {
      return console.log('Chat.user is not defined');
    }

    chat?.Users?.forEach(user => {
      if (user.id === newMessage.userId) return;
      console.log('send to: ', user.id);
      socket.in(user.id).emit('msg_received', newMessage)
    })
  })
  //room is chatId
  socket.on('typing', (room) => socket.to(room).emit("typing", room))
  socket.on('stop typing', (room) => socket.to(room).emit("stop typing"))
  // socket.on('get chats', (usersData) => {
  //   //users is arr of userId
  //   console.log(usersData);
  //   usersData?.users?.forEach(user => {
  //     socket.to(user.id).emit('get chats')
  //   })
  // })
})


//server running
const PORT = process.env.PORT || 5002
server.listen(PORT, () => {
  console.log('messageService is running on port: ', PORT);
})