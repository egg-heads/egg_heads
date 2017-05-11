const router = require('express').Router();
const User = require('../models/user');
const Meal = require('../models/meal');
const ensureAuth = require('../auth/ensure-auth')();

router
  .get('/', ensureAuth, (req, res, next) => {
    User.findById(req.user.id)
      .then(data => res.send(data))
      .catch(next);
  })

  .post('/fridge', ensureAuth, (req, res, next) => {

    if (!Array.isArray(req.body)) req.body = [req.body];

    User.findByIdAndUpdate(
      req.user.id,
      { $push: { fridge: { $each: req.body } } },
      { new: true })
      .then(user => res.send(user.fridge))
      .catch(next);
  })

  .get('/fridge', ensureAuth, (req, res, next) => {
    User.getFridge(req.user.id)
      .then(fridge => res.send(fridge))
      .catch(next);
  })

  .get('/meals', ensureAuth, (req, res, next) => {
    User.getFridge(req.user.id)
      .then(fridge => {
        const ingredients = fridge.map(item => item.ingredient);
        return Meal.find({ ingredients: { $all: ingredients } });
      })
      .then(meals => res.send(meals))
      .catch(next);
  });

module.exports = router;