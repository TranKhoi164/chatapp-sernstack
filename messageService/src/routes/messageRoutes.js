const router = require('express').Router()


const { createMessage, getMessages } = require('../controller/messageController')
const { authUserMiddleware } = require('../middleware/authMiddlware')

router.get('/', (req, res) => {
  res.json({msg: 'Hello message'})
})
//it take chat Id
router.get('/get_messages', authUserMiddleware, getMessages)

router.post('/create_message', authUserMiddleware, createMessage)

module.exports = router