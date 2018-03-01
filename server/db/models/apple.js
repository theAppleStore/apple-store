const Sequelize = require('sequelize')
const db = require('../db')
const Review = require('./index')

const Apple = db.define('apple', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  image: {
    type: Sequelize.STRING,
    defaultValue: 'https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg'
  },
  price: {
    type: Sequelize.INTEGER
  },
  description: {
    type: Sequelize.TEXT
  },
  stock: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0
    }
  },
  category: { //if we have time, make a separate category model
    type: Sequelize.STRING
  } 
})

//add instance method that decrements stock
Apple.prototype.decrementStock = function(num) {
  let newStock = this.stock - num
  return Apple.update({stock: newStock}, {
    where: {
      id: this.id
    }
  })
}

// method that gets all the reviews for a specific apple
Apple.prototype.getReviews = function() {
  let apple = this;
  return Review.findAll({
    where: {appleId: apple.id}
  })
}

module.exports = Apple

