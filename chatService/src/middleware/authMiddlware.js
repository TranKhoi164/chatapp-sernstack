const handleExceptions = require("../utils/handleExceptions.js");
const jwt = require('jsonwebtoken')

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
module.exports = {
  authUserMiddleware: authUserMiddleware,
}