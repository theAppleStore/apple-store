const express = require("express");
const router = express.Router();
const {Order, Apple} = require('../db/models');

router.get('/', (req, res, next) => {
    Order.findAll()
    .then(orders => res.json(orders))
    .catch(next)
})

router.post('/new', (req, res, next) => {
    // Order.create(req.body)
    // .then(newOrder => res.json(newOrder))
    // .catch(next)
    // if not logged in, no userId
    // if logged in and not admin, use req.user.id
    //  if admin, user can be req.body.userId
    Order.findOrCreate({
        where: {
            status: 'Created',
            userId: req.body.userId
        }
    })
        .then(([order, createdBool]) => res.json(order))
        .catch(next)
})

router.get('/single/:id', (req, res, next) => {
    Order.findById(req.params.id, {include: [{model: Apple}]})
    .then(order => {
        res.json(order)
    })
    .catch(next)
})

router.put('/single/:id', (req, res, next) => {
    Order.findById(req.params.id)
    .then(foundOrder => foundOrder.update(req.body))
    .then(updated => res.json(updated))
    .catch(next)
})

router.get('/:userId', (req, res, next) => {
    Order.findAll({
        where: {
            userId: req.params.userId
        }
    })
    .then(orders => res.json(orders))
    .catch(next)
})

module.exports = router;

// cart router
// `/api/cart`
// in here Order.findOrCreate -- that you have above
// .then order.addProduct()   
    // THEN send response back