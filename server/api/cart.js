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
    .then(res.status(204).end())
    .catch(next);
})

module.exports = router;