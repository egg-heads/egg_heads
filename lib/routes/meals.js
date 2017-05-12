const router = require('express').Router();
const Meal = require('../models/meal');
const ensureAuth = require('../auth/ensure-auth')();
const ensureChef = require('../auth/ensure-chef')();

router
  .get('/', ensureAuth, (req, res, next) => {
    Meal.find()
      .select('-__v')
      .populate({
        path: 'ingredients',
        select: 'name'
      })
      .then(meals => res.send(meals))
      .catch(next);
  })

  .post('/', ensureAuth, ensureChef, (req, res, next) => {
    Meal.create(req.body)
      .then(meals => res.send(meals))
      .catch(next);
  })

  .delete('/', ensureAuth, ensureChef, (req, res, next) => {
    Meal.findByIdAndRemove(req.body.id)
      .then(response => res.send({ removed: !!response }))
      .catch(next);
  });

module.exports = router;