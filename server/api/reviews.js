// const express = require("express");
// const router = express.Router();
// const Apples = require('../db/models/apple.js');



// router.post('/:id/reviews', (req, res, next) => {
//     console.log("this is req body " + JSON.stringify(req.body)); 
//     console.log(req.body.review);
//     // console.dir(req);
    
//     Apple.create({
//         username: req.body.username,
//         password: hash
//     }).then(function(result){
//         res.send("OK");
//     }) .catch(function(err){
//         throw err;
//     });
//   });