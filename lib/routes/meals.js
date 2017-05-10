const router = require('express').Router();
const Meal = require('../models/meal');

const ensureAuth = require('../auth/ensure-auth')();

router
  .get('/', ensureAuth, (req, res, next) => {
    Meal.find()
      .then(meals => res.send(meals))
      .catch(next);
  });

  // .post('/', ensureAuth, (req, res, next) => {
  //   Meal.create(req.body)
  //     .then(meals => res.send(meals))
  //     .catch(next);
  // });

  module.exports = router;