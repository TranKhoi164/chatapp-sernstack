const handleExceptions = require("../utils/handleExceptions");
const jwt = require('jsonwebtoken');
const { createRefreshToken } = require("../utils/jwtFunc");

const checkCredentialsMiddleware = (req, res, next) => {
  const {name, password} = req.body.user

  const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
  if (!name || !password) {
    return handleExceptions(400, 'Missing credentials!', res)
  }
  if (!password.match(re)) {
    return handleExceptions(400, 'Passowrd must contain at least 8 characters, 1 letter and 1 number', res)
  }
  next()
}

const authUserMiddleware = (req, res, next) => {
  try {
    const access_token = req.headers.authorization
    if (!access_token) {
      handleExceptions(400, 'Unauthorized request', res)
      return
    }
    jwt.verify(access_token, process.env.JWT_ACCESS_TOKEN, async (e, userData) => {
      if (e) {
        handleExceptions(400, e.message, res)
        return
      }
      req.body.userId = userData.userId
      next()
    })
  } catch (e) {
    handleExceptions(500, e.message, res)
  }
}

const refreshAccessTokenMiddleware = (req, res, next) => {
  try {
    let refresh_token = req.cookies.refreshtoken
    if (!refresh_token) {
      refresh_token = createRefreshToken({userId: req.body.userId}, res)
    } 
    req.body.refresh_token = refresh_token
    next()
  } catch(e) {
    handleExceptions(500, e.message, res)
  }
}

module.exports = {
  checkCredentialsMiddleware: checkCredentialsMiddleware,
  authUserMiddleware: authUserMiddleware,
  refreshAccessTokenMiddleware: refreshAccessTokenMiddleware
}