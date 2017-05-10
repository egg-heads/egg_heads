const router = require('express').Router();
const User = require('../models/user');
// const Ingredient = require('../models/ingredient');
const ensureAuth = require('../auth/ensure-auth')();

router
  .get('/', ensureAuth, (req, res, next) => {
    User.findById(req.user.id)
      .then(data => res.send(data))
      .catch(next);
  })

  .post('/fridge', ensureAuth, (req, res, next) => {
    User.findByIdAndUpdate(
      req.user.id,
      { $push: { fridge: { $each: { ingredient: [req.body] } } } },
      { new: true })
      .then(user => res.send(user.fridge))
      .catch(next);
  })

  .get('/fridge', ensureAuth, (req, res, next) => {
    User.findById(req.user.id)
      .then(user => res.send(user.fridge))
      .catch(next);

  });

  //   it('adding ingredients to fridge', () => {
  //   let fridgeIngredientsArray = testIngredients.map(ingredient => {
  //     return { ingredient: ingredient._id };
  //   });
  //   console.log('we are here', fridgeIngredientsArray);

  //   return request.post('/me/fridge')
  //     .set('Authorization', token)
  //     .send(fridgeIngredientsArray)
  //     .then(res => {
  //       console.log(res.body);
  //     })
  //     .then(res => res.body)
  //     .then(fridgeArray => {
  //       assert.equal(fridgeArray.length, 3);
  //       assert.equal(fridgeArray[0].ingredient, fridgeIngredientsArray[0].ingredient);
  //     });
  // });




    //   if(!ingredient)
    //    new Ingredient(req.body)
    // .save()
    // .then(ingredient => res.send(ingredient))
    // .catch(next);
    // else
    // $push
    // })
    // .then(ingredients => res.send(ingredients))
    // .catch(next);
  // });

module.exports = router;