const handleExceptions = require('../utils/handleExceptions')
const jwt = require('jsonwebtoken')


const Users = require('../model/UserModel')
const { createAccessToken, createRefreshToken } = require('../utils/jwtFunc')
const { createUserEvent } = require('../redis/redisPublishEvent')

const userRegister = async (req, res) => {
  try {
    const {name, password} = req.body.user
    const [newUser, created] = await Users.findOrCreate({
      where: {name: name},
      defaults: {
        name: name,
        password: password
      }
    })
    if (!created) {
      return res.status(400).json({message: 'User is already exist.'})
    }
    const accessToken = createAccessToken({userId: newUser.id})
    createRefreshToken({userId: newUser.id}, res)

    //redis publish event
    createUserEvent({id: newUser.id, name})

    res.json({
      user: {...newUser.dataValues, accessToken}, 
      message: 'Register successfully'
    })
  } catch (e) {
    handleExceptions(500, e.message, res)
  }
}

const userLogin = async (req, res) => {
  try {
    const {name, password} = req.body.user
    const user = await Users.findOne({
      where: {name: name},
    })
    if (!user) {
      return res.status(400).json({message: "User hasn't registered yet"})
    }
    if (password !== user.password) {
      return res.status(400).json({message: "Wrong password"})
    }
    const accessToken = createAccessToken({userId: user.id})
    createRefreshToken({userId: user.id}, res)
    res.json({user: {...user.dataValues, accessToken}, message: 'Login successfully'})
  } catch (e) {
    handleExceptions(500, e.message, res)
  }
}

const userLogout = (req, res) => {
  try {
    res.clearCookie('refreshtoken', {path: '/account/refresh_token'})
    res.json({message: 'Logout successfully'})
  } catch (e) {  
    handleExceptions(500, e.message, res)
  }
}


const refreshAccessToken = (req, res) => {
  try {
    let refresh_token = req.body.refresh_token
    jwt.verify(refresh_token, process.env.JWT_REFRESH_TOKEN, async (e, accountData) => {
      if (e) {
        handleExceptions(400, e.message, res)
        return
      }
      const access_token = createAccessToken({userId: accountData.userId})
      
      res.json({access_token: access_token})
    })
  } catch(e) {
    handleExceptions(500, e.message, res)
  }
}




module.exports = {
  userRegister: userRegister,
  userLogin: userLogin,
  userLogout: userLogout,
  refreshAccessToken: refreshAccessToken
}