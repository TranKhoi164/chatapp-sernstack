const {DataTypes, Model} = require('sequelize')

module.exports = (sequelize) => {
  try {
    class User extends Model {}

    User.init({
      // Model attributes are defined here
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      picture: {
        type: DataTypes.STRING,
      }
    }, {
      // Other model options go here
      timestamps: false,
      sequelize, // We need to pass the connection instance
      modelName: 'User' // We need to choose the model name
    });

    return User
  } catch (e) {
    throw new Error(e)
  }
}


// module.exports = (sequelize, DataTypes) => {
//   sequelize.define('user', {
//     id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       primaryKey: true
//     },
//     name: {
//       type: DataTypes.STRING,
//       allowNull: false
//     },
//     picture: {
//       type: DataTypes.STRING,
//     }
//   }, {
//     timestamps: false
//   });
// }

// User.belongsToMany(Chat, { 
//   through: UserChat 
// })

// (async () => {
//   await User.sync({ alter: true })
// })();

// module.exports = User