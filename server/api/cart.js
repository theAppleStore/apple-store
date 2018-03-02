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

// router.get('/:orderId', (req, res, next) => {
//     LineItem.findAll({
//         where: {
//             orderId: req.params.orderId
//         }
//     })
//     .then(items => res.json(items))
//     .catch(next)
// })

module.exports = router;