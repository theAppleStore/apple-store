const express = require("express");
const router = express.Router();
// const Reviews = require('../db/models/reviews.js');
const Apple = require("../db/models/apple.js");

router.get("/", function(req, res, next) {
  Apple.findAll()
    .then(allApples => res.json(allApples))
    .catch(next);
});

router.get("/:id", function(req, res, next) {
  Apple.findById(req.params.id)
    .then(apple => res.json(apple))
    .catch(next);
});

router.get("/type/:category", (req, res, next) => {
  Apple.findAll({
    where: {
      category: req.params.category
    }
  })
    .then(apples => res.json(apples))
    .catch(next);
});

//posting new apple in the database
router.post("/", (req, res, next) => {
  Apple.create(req.body)
    .then(apple => res.json(apple))
    .catch(next);
});

router.put("/:id", (req, res, next) => {
  const { id } = req.params;
  Apple.update(req.body, {
    where: { id: id },
    returning: true
  })
    .then(([_, [updatedApple]]) => {
      res.json(updatedApple);
    })
    .catch(next);
});

router.delete("/:id", (req, res, next) => {
  const { id } = req.params;
  Apple.destroy({
    where: { id: id }
  })
    .then(() => res.sendStatus(204))
    .catch(next);
});

module.exports = router;
