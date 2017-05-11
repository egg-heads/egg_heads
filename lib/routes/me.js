const router = require('express').Router();
const User = require('../models/user');
const Meal = require('../models/meal');
const ensureAuth = require('../auth/ensure-auth')();

router
  .get('/', ensureAuth, (req, res, next) => {
    User.findById(req.user.id)
      .lean()
      .populate('fridge.ingredient', '-__v')
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
        return Meal.find({ ingredients: { $all: ingredients } })
        .select('-__v');
      })
      .then(meals => res.send(meals))
      .catch(next);
  })

  .put('/', ensureAuth, (req, res, next) => {
    User.findByIdAndUpdate(req.user.id,
      { $set: req.body }, { new: true })
      .then(updatedUser => res.send(updatedUser))
      .catch(next);
  });

module.exports = router;