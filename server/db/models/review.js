const Sequelize = require('sequelize')
const db = require('../db')

const Review = db.define('review', {
  text: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  subjectField: {
    type: Sequelize.STRING,
    defaultValue: function(){
      return this.getDataValue('text').slice(0,25) + '...'
    }
  }
})

module.exports = Review