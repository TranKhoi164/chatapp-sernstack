const Sequelize = require('sequelize')
const handleExceptions = require('../utils/handleExceptions')
const Users = require(('../model/UserModel'))
const Op = Sequelize.Op

//user contain user name
const searchUsers = (req, res) => {
  try {
    const {name} = req.query
    Users.findAll({where: {name: {[Op.like]: '%'+name+'%'}}})
    .then(users => {
      return res.json({users: users})
    }).catch(e => handleExceptions(500, e.message, res))
  } catch (e) {
    handleExceptions(500, e.message, res)
  }
}

module.exports = {
  searchUsers: searchUsers
}