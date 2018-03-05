const router = require('express').Router()
const {User, Order} = require('../db/models')
const {makeError, isLoggedIn, isAdmin} = require('../../utility')
module.exports = router

router.get('/', isLoggedIn, isAdmin, (req, res, next) => {
// router.get('/', (req, res, next) => {
  User.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    attributes: ['id', 'email', 'firstName', 'lastName', 'isAdmin']
  })
    .then(users => res.json(users))
    .catch(next)
})

router.get('/:userId', (req, res, next) => {
  const {userId} = req.params
  User.findOne({
    where: { id: userId },
    include: [{ model: Order }]
  })
    .then(user => res.json(user))
    .catch(next)
})

router.put('/:userId', (req, res, next) => {
  const {userId} = req.params
  User.update(req.body, {
    where: {
      id: userId
    },
    returning: true
  })
    .then(([_, [updatedUser]]) => {
      res.json(updatedUser)
    })
    .catch(next)
})
