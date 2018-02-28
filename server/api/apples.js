const express = require("express");
const router = express.Router();
const Apples = require('../db/models/apple.js');

router.get("/", function(req, res, next){
    Apples.findAll()
    .then(function(allApples){
     res.json(allApples);
    })
    .catch(next);
 });

 router.get('/:category', (req, res, next) => {
     Apples.findAll({where: {
         category: req.params.category
     }})
     .then(apples => res.send(apples))
     .catch(next)
 })

 module.exports = router;