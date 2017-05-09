const router = require('express').Router();
const User = require('../models/user');

router
  .get('/', (req, res, next) => {
    User.findById(req.params.id)
      .then(data => res.send(data))
      .catch(next);
  });

module.exports = router;