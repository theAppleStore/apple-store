const Sequelize = require('sequelize')
const db = require('../db')

const Apple = db.define('apple', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  image: {
    type: Sequelize.STRING,
  },
  price: {
    type: Sequelize.INTEGER
  },
  description: {
    type: Sequelize.TEXT
  },
  stock: {
    type: Sequelize.INTEGER
  },
  category: {
    type: Sequelize.STRING
  }
})

module.exports = Apple

