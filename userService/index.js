require('dotenv').config()
require('./databaseConnection')
const express = require('express')
const cors = require('cors')
const cookie = require('cookie-parser')
const app = express()
//Routes
const userRoutes = require('./routes/userRoute')

app.use(cors({
  origin: process.env.CLIENT_URL,
  method: "GET,POST,PATCH,DELETE",
  credentials: true
}))
app.use(cookie())
app.use(express.json())

//Routes
app.use('/user', userRoutes)

//server running
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log('Server is running on port: ', PORT);
})