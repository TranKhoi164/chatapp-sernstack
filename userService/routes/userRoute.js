const { userRegister, userLogin, userLogout, refreshAccessToken } = require('../controller/authController')
const {searchUsers} = require('../controller/userController')
const { checkCredentialsMiddleware, authUserMiddleware, refreshAccessTokenMiddleware } = require('../middleware/authMiddlware')

const router = require('express').Router()


const CLIENT_URL = process.env.CLIENT_URL

router.get('/', (req, res) => {
  res.json({msg: 'Hello user'})
})
// auth route
router.post('/auth/refresh_token', refreshAccessTokenMiddleware, refreshAccessToken)
router.post('/auth/register', checkCredentialsMiddleware, userRegister)
router.post('/auth/login', checkCredentialsMiddleware, userLogin)
router.get('/auth/logout', authUserMiddleware, userLogout)

// user route
router.get('/search_users', searchUsers)


module.exports = router