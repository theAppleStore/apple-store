const express = require("express");
const router = express.Router();
const Apple = require('../db/models/apple.js');

router.get("/", function(req, res, next){
    Apple.findAll()
    .then(allApples => res.json(allApples))
    .catch(next);
 });

 router.get('/:id', function (req,res,next){
    Apple.findById(req.params.id)
    .then(apple => res.json(apple))
    .catch(next);
});


 router.get('/type/:category', (req, res, next) => {
     Apple.findAll({where: {
         category: req.params.category
     }})
     .then(apples => res.json(apples))
     .catch(next)
 })

 //posting new apple in the database

 module.exports = router;
