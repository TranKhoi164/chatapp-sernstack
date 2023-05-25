const router = require('express').Router()
const { createChat, getChats } = require('../controller/chatController')
const { authUserMiddleware } = require('../middleware/authMiddlware')

router.get('/', (req, res) => {
  res.json({msg: 'Hello chat'})
})
router.get('/get_chats', authUserMiddleware, getChats)
//can be on-one chat or group chat 
router.post('/create_chat', authUserMiddleware, createChat)

module.exports = router