const router = require('express').Router();
const Ingredient = require('../models/ingredient');
// const db = require('../connect');

const ensureAuth = require('../auth/ensure-auth');

router
  .get('/', ensureAuth, (req, res, next) => {
    Ingredient.find()
      .then(ingredients => res.send(ingredients))
      .catch(next);
  })

  .post('/', ensureAuth, (req, res, next) => {
    new Ingredient(req.body)
      .save()
      .then(ingredient => res.send(ingredient))
      .catch(next);
  });

module.exports = router;