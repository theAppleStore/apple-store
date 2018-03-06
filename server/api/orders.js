const express = require("express");
const router = express.Router();
const {Order, Apple} = require('../db/models');
const {makeError, isLoggedIn, isAdmin} = require('../../utility')

router.get('/', isLoggedIn, isAdmin, (req, res, next) => {
    Order.findAll()
    .then(orders => res.json(orders))
    .catch(next)
})



router.post('/new', (req, res, next) => {
    // if not logged in, no userId
    // if logged in and not admin, use req.user.id
    //  if admin, user can be req.body.userId
    if(req.user){
        Order.findOrCreate({
            where: {
                status: 'Created',
                userId: req.body.userId
            }
        })
        .then(([order, createdBool]) => res.json(order))
        .catch(next)
    } else {
        if (req.session.cart[req.body.appleId]) {
            req.session.cart[req.body.appleId] += +req.body.quantity 
        } else {
            req.session.cart[req.body.appleId] = +req.body.quantity
        }
        res.send(req.session.cart)
    }
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
    console.log('id', req.params.userId)
    Order.findAll({
        where: {
            userId: req.params.userId // consider req.user.id for non-admin, logged in users
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

// OR 
// OUR CHOICE
// leave findOrCreate in order
// in redux store for active-order have it post to order and then once a response is received have it post to line item