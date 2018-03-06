const express = require("express")
const router = express.Router()
const Apples = require('../db/models/apple.js')
const Reviews = require ('../db/models/review.js')
const User = require ('../db/models/user.js')

router.post('/', (req, res, next) => {
    Reviews.create({
        userId: req.body.userId,
        appleId: req.body.appleId,
        subjectField: req.body.subjectField,
        text: req.body.text
    }).then(result => res.status(200).send("OK")) 
    .catch(err => res.status(400).send(err))
})

router.get('/:id', (req,res,next) => {
    Reviews.findAll({where: {
        appleId: req.params.id
    },
         include:[{
             model: User,
             required: true
         }]
    })
    .then(reviews => res.json(reviews))
    .catch( err => res.status(400).send(err))
})


module.exports = router;