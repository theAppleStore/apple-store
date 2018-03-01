const express = require("express");
const router = express.Router();
const Apples = require('../db/models/apple.js');
// const Reviews = require('../db/models/reviews.js');

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

router.post('/:id/reviews', (req, res, next) => {
    console.log("this is req body " + JSON.stringify(req.body)); 
    
    Reviews.create({
        text: req.body.text,
        subjectField: req.body.subjectField
    }).then(function(result){
        res.send("OK");
    }) .catch(function(err){
        throw err;
    });
  });

 router.get('/type/:category', (req, res, next) => {
     Apples.findAll({where: {
         category: req.params.category
     }})
     .then(apples => res.send(apples))
     .catch(next)
 })

 module.exports = router;
