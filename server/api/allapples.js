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
