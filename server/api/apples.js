const express = require("express");
const router = express.Router();
module.exports = router;
const Apples = require('../db/models/apple.js');

router.get("/", function(req, res, next){
    Apples.findAll()
    .then(function(allApples){
     res.json(allApples);
    })
    .catch(next);
 });

 router.get('/:id', function (req,res,next){
    Apples.findById(req.params.id)
    .then(Apples => res.json(Apples))
    .catch(next);
});


