const assert = require('chai').assert;
const db = require('./db');
const request = require('./request');

describe.only('/me API', () => {

  before(db.drop);

  let token = '';

  const user = {
    email: 'sup@suuuup.com',
    password: 'yippeeeee',
    chef: true
  };

  let testIngredients = [
    { name: 'chicken' }, { name: 'mashed potatoes' }, { name: 'gravy' }
  ];

  let testMeals = [
    { name: 'grilled cheese' }, { name: 'chicken dinner' }
  ];

  before(() => {
    return request.post('/auth/signup')
      .send(user)
      .then(res => token = res.body.token);
  });

  it('initial GET returns test user', () => {
    return request.get('/me')
      .set('Authorization', token)
      .then(res => assert.equal(res.body.email, user.email));
  });

  describe('fridge post', () => {

    before(() => {
      return request.post('/ingredients')
        .set('Authorization', token)
        .send(testIngredients)
        .then(res => res.body)
        .then(savedIngredients => {
          assert.ok(savedIngredients[0]._id);
          testIngredients = savedIngredients;
        });
    });

    it('adding single ingredient to fridge', () => {
      let fridgeItem = { ingredient: testIngredients[0]._id, expiration: new Date() };

      return request.post('/me/fridge')
        .set('Authorization', token)
        .send(fridgeItem)
        .then(res => res.body)
        .then(fridgeArray => {
          assert.equal(fridgeArray[0].ingredient, testIngredients[0]._id);
        });
    });

    it('adding multiple ingredients to fridge', () => {
      let fridgeItem = [{ ingredient: testIngredients[0]._id, expiration: new Date() }, { ingredient: testIngredients[1]._id, expiration: new Date() }];

      // TODO: potentially use or reference the above test ingredients to make sure they are saved to the meals in the meals collection

      return request.post('/me/fridge')
        .set('Authorization', token)
        .send(fridgeItem)
        .then(res => res.body)
        .then(fridgeArray => {
          assert.equal(fridgeArray[0].ingredient, testIngredients[0]._id);
          assert.equal(fridgeArray.length, 3);
        });
    });

    it('gets ingredients in fridge', () => {
      return request.get('/me/fridge')
        .set('Authorization', token)
        .then(res => res.body)
        .then(fridgeIngredients => {
          assert.equal(fridgeIngredients.length, 3);
        });

    });

  });

  describe('/meals api', () => {

    // need to save ingregrients when posting to /meal in this shape:
    // "ingredients": [
    //   "591494eba84cac001175ec41",
    //   "591494eba84cac001175ec42",
    //   "591494eba84cac001175ec43"
    // ]

//     [
//   {
//     "__v": 0,
//     "name": "ricotta",
//     "_id": "5914cea6f540a6c8e6360a6a"
//   },
//   {
//     "__v": 0,
//     "name": "mozzarella",
//     "_id": "5914cea6f540a6c8e6360a6b"
//   },
//   {
//     "__v": 0,
//     "name": "tomato sauce",
//     "_id": "5914cea6f540a6c8e6360a6c"
//   },
//   {
//     "__v": 0,
//     "name": "pasta",
//     "_id": "5914cea6f540a6c8e6360a6d"
//   }
// ]


    before('saves a meal with ingredients', () => {
      const ingredientIdArray = testIngredients.map(ingredient => ingredient._id);
      testMeals[1].ingredients = ingredientIdArray;

      return request.post('/meals')
        .set('Authorization', token)
        .send(testMeals)
        .then(res => res.body)
        .then(savedMeals => {
          assert.ok(savedMeals);
          assert.equal(savedMeals[1].ingredients.length, 3);

          testMeals = savedMeals;
        });
    });

    it('gets meals which have matching ingredients to users fridge', () => {
      return request.get('/me/meals')
        .set('Authorization', token)
        .then(res => res.body)
        .then(meals => {
          assert.equal(meals.length, 1);
        });      
    });

  });

  describe('/favorites api', () => {

    it('initial GET to favorites returns empty array', () => {
      return request.get('/me/favorites')
        .set('Authorization', token)
        .then(res => res.body)
        .then(favorites => assert.deepEqual(favorites, []));
    });

    it('POST saves to favorites', () => {
      return request.post('/me/favorites')
        .set('Authorization', token)
        .send(testMeals[1])
        .then(res => res.body)
        .then(saved => assert.equal(saved.favorites[0]._id, testMeals[1]._id));
    });

    it('DELETE removes from favorites', () => {
      return request.delete('/me/favorites')
        .set('Authorization', token)
        .send(testMeals[1]._id)
        .then(res => res.body)
        .then(deleted => assert.isTrue(deleted.removed));
    });
  });
});