const router = require('express').Router();
const User = require('../models/user');
// const Ingredient = require('../models/ingredient');
const ensureAuth = require('../auth/ensure-auth');

router
  .get('/', ensureAuth, (req, res, next) => {
    User.findById(req.params.id)
      .then(data => res.send(data))
      .catch(next);
  })

  .post('/fridge', ensureAuth, (req, res, next) => {
    // console.log(req.body);
    // console.log('user', req.user);
    User.findByIdAndUpdate(req.user.id)
      .then(user => {

      })
      .then(ingredients => res.send(ingredients))
      .catch(next);
  });

module.exports = router;