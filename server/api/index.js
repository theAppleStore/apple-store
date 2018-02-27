const router = require('express').Router()

router.use('/users', require('./users'))
router.use('/apples', require('./apples'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})

module.exports = router