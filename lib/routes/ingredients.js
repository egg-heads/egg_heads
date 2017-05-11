const router = require('express').Router();
const Ingredient = require('../models/ingredient');

const ensureAuth = require('../auth/ensure-auth')();

router
  .get('/', ensureAuth, (req, res, next) => {
    Ingredient.find()
      .lean()
      .select('-__v')
      .then(ingredients => res.send(ingredients))
      .catch(next);
  })

  .post('/', ensureAuth, (req, res, next) => {
    Ingredient.create(req.body)
      .then(ingredients => res.send(ingredients))
      .catch(next);
  });

module.exports = router;