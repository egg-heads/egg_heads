const router = require('express').Router();
const User = require('../models/user');
const Ingredient = require('../models/ingredient');

router
  .get('/', (req, res, next) => {
    User.findById(req.params.id)
      .then(data => res.send(data))
      .catch(next);
  })

  .post('/fridge', (req, res, next) => {
    new Ingredient(req.body)
      .save()
      .then(ingredients => res.send(ingredients))
      .catch(next);
  });

module.exports = router;