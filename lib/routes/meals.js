const router = require('express').Router();
const Meal = require('../models/meal');
const ensureAuth = require('../auth/ensure-auth')();
const ensureChef = require('../auth/ensure-chef')();

router
  .get('/', ensureAuth, ensureChef, (req, res, next) => {
    Meal.find()
      .then(meals => res.send(meals))
      .catch(next);
  })

  .post('/', ensureAuth, ensureChef, (req, res, next) => {
    Meal.create(req.body)
      .then(meals => res.send(meals))
      .catch(next);
  });

module.exports = router;