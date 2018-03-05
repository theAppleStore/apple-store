const express = require("express");
const router = express.Router();
const {LineItem} = require('../db/models');

router.post('/', (req, res, next) => {
    LineItem.findOne({
        where: {
            orderId: req.body.orderId,
            appleId: req.body.appleId
        }
    })
    .then(item => {
        if(item) return item.update({quantity: item.quantity + req.body.quantity})
        return LineItem.create(req.body)
    })
    .then(item => res.json(item))
    .catch(next);
})

router.delete('/:appleId', (req, res, next) => {
    LineItem.destroy({
        where: {
            appleId: req.params.appleId
        }
    })
    .then(apple => {
      res.json(req.params.appleId).status(204)
    })
    .catch(next);
})

router.get('/session', (req, res, next) => {
    res.json(req.session.cart)
})

router.delete('/session/:appleId', (req, res, next) => {
    delete req.session.cart[req.params.appleId]
    res.json(req.session.cart)
})

module.exports = router;