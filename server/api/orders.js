const express = require("express");
const router = express.Router();
const {Order, Apple} = require('../db/models');

router.get('/', (req, res, next) => {
    Order.findAll()
    .then(result => res.send(result))
    .catch(next)
})

router.get('/:id', (req, res, next) => {
    Order.findById(req.params.id, {include: [{model: Apple}]})
    .then(order => {
        res.send(order)
    })
    .catch(next)
})

router.put('/:id', (req, res, next) => {
    Order.findById(req.params.id)
    .then(foundOrder => foundOrder.update(req.body))
    .then(updated => res.send(updated))
    .catch(next)
})

module.exports = router;