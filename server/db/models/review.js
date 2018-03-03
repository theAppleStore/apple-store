const Sequelize = require('sequelize')
const db = require('../db')

const Review = db.define('review', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  subjectField: {
    type: Sequelize.STRING,
    // defaultValue: function(){
    //   return Review.getDataValue('text').slice(0,25) + '...'
    // }
  },
  text: {
    type: Sequelize.TEXT,
    allowNull: false
  }
})

module.exports = Review