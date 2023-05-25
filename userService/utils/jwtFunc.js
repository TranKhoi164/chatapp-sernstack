const jwt = require('jsonwebtoken')

const createAccessToken = (payload) => {
  return jwt.sign(payload,process.env.JWT_ACCESS_TOKEN, {expiresIn: '15m'})
}

function createRefreshToken(payload, res) {
  const refresh_token = jwt.sign(payload, process.env.JWT_REFRESH_TOKEN, {expiresIn: '7d'})

  res.cookie('refreshtoken', refresh_token, {
    httpOnly: true,
    path: '/account/refresh_token',
    sameSite: 'strict',
    maxAge: 7*24*59*60*1000
    //7*24*60*60*1000 //1 wee
  })
  return refresh_token
}

module.exports = {
  createAccessToken: createAccessToken,
  createRefreshToken: createRefreshToken
}