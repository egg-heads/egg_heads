const assert = require('chai').assert;
const db = require('./db');
const request = require('./request');

describe('/me API', () => {

  before(db.drop);

  let token = '';
  let fridgeIngredients = '';

  const user = {
    email: 'sup@suuuup.com',
    password: 'yippeeeee',
    chef: true
  };

  let testIngredients = [
    { name: 'chicken' }, { name: 'mashed potatoes' }, { name: 'gravy' }, { name: 'old brussels' }
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
      .then(res => {
        assert.equal(res.body.email, user.email);
        assert.ok(res.body.favorites);
        assert.ok(res.body.fridge);
      });
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
      let fridgeItem = { ingredient: testIngredients[0]._id };

      return request.post('/me/fridge')
        .set('Authorization', token)
        .send(fridgeItem)
        .then(res => res.body)
        .then(fridgeArray => {
          assert.equal(fridgeArray[0].ingredient, testIngredients[0]._id);
        });
    });

    it('adding multiple ingredients to fridge', () => {
      let fridgeItem = [{ ingredient: testIngredients[1]._id }, { ingredient: testIngredients[2]._id }, { ingredient: testIngredients[3]._id }];

      return request.post('/me/fridge')
        .set('Authorization', token)
        .send(fridgeItem)
        .then(res => res.body)
        .then(fridgeArray => {
          assert.equal(fridgeArray[0].ingredient, testIngredients[0]._id);
          assert.equal(fridgeArray.length, 4);
        });
    });

    it('gets ingredients in fridge', () => {
      return request.get('/me/fridge')
        .set('Authorization', token)
        .then(res => res.body)
        .then(gottenIngredients => {
          assert.equal(gottenIngredients.length, 4);
          fridgeIngredients = gottenIngredients;
        });
    });

    it('DELETE removes from fridge', () => {
      return request.delete('/me/fridge')
        .set('Authorization', token)
        .send({ _id: fridgeIngredients[2].ingredient._id })
        .then(res => res.body)
        .then(updated => assert.equal(updated.fridge.length, 3));
    });

  });

  describe('/meals api', () => {

    before('saves a meal with ingredients', () => {
      const ingredientIdArray = testIngredients.map(ingredient => ingredient._id);
      testMeals[1].ingredients = ingredientIdArray;

      return request.post('/meals')
        .set('Authorization', token)
        .send(testMeals)
        .then(res => res.body)
        .then(savedMeals => {
          assert.ok(savedMeals);
          assert.equal(savedMeals[1].ingredients.length, 4);

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

    it('GET to /me returns favorites and fridge arrays', () => {
      return request.get('/me')
        .set('Authorization', token)
        .then(res => {
          assert.equal(res.body.favorites.length, 1);
          assert.equal(res.body.fridge.length, 3);
        });
    });

    it('DELETE removes from favorites', () => {
      return request.delete('/me/favorites')
        .set('Authorization', token)
        .send(testMeals[1]._id)
        .then(res => res.body)
        .then(updated => assert.equal(updated.favorites.length, 0));
    });
  });
});