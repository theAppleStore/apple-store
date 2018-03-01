const User = require('./user')
const Apple = require('./apple')
const Order = require('./order')
const Review = require('./review')
const LineItem = require('./lineItem')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */



User.hasMany(Order)
User.hasMany(Review)   //can do User.getreviewId //Also do Review.belongsTo(User)

Apple.hasMany(Review)

Order.belongsTo(User)
Order.belongsToMany(Apple, {through: LineItem})

Review.belongsTo(Apple)
Review.belongsTo(User)



module.exports = {
  User,
  Apple,
  Order,
  Review,
  LineItem
}
