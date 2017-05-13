const router = require('express').Router();
const User = require('../models/user');
const Meal = require('../models/meal');
const ensureAuth = require('../auth/ensure-auth')();

router
  .get('/', ensureAuth, (req, res, next) => {
    User.isItMoldy(req)
      .then(user => res.send(user))
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

  .delete('/fridge', ensureAuth, (req, res, next) => {
    User.findByIdAndUpdate(req.user.id,
      { $pull: { fridge: { ingredient: req.body._id } } },
      { new: true })
      .then(updated => res.send(updated))
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
  })

  .get('/favorites', ensureAuth, (req, res, next) => {
    User.findById(req.user.id)
      .then(user => res.send(user.favorites))
      .catch(next);
  })

  .post('/favorites', ensureAuth, (req, res, next) => {

    if (!Array.isArray(req.body)) req.body = [req.body];

    User.findByIdAndUpdate(
      req.user.id,
      { $push: { favorites: { $each: req.body } } },
      { new: true })
      .lean()
      .select('favorites')
      .populate('favorites.meal')
      .then(favorites => res.send(favorites))
      .catch(next);
  })

  .delete('/favorites', ensureAuth, (req, res, next) => {
    User.findByIdAndUpdate(req.user.id,
      { $pull: { favorites: req.body } },
      { new: true })
      .then(updated => res.send(updated))
      .catch(next);
  });

module.exports = router;