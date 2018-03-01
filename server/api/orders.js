const express = require("express");
const router = express.Router();
const {Order, Apple} = require('../db/models');

router.get('/', (req, res, next) => {
    Order.findAll()
    .then(orders => res.json(orders))
    .catch(next)
})

router.get('/:id', (req, res, next) => {
    Order.findById(req.params.id, {include: [{model: Apple}]})
    .then(order => res.json(order))
    .catch(next)
})

router.put('/:id', (req, res, next) => {
    Order.findById(req.params.id)
    .then(foundOrder => foundOrder.update(req.body))
    .then(updated => res.json(updated))
    .catch(next)
})

module.exports = router;