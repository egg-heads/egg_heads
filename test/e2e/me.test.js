const assert = require('chai').assert;
const db = require('./db');
const request = require('./request');

describe.only('/me API', () => {

  before(db.drop);

  let token = '';

  const user = {
    email: 'sup@suuuup.com',
    password: 'yippeeeee'
  };

  let testIngredients = [
    {
      name: 'tea'
    },
    {
      name: 'ice cream'
    },
    {
      name: 'shishkabob'
    }
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

  it('saves ingredients', () => {
    return request.post('/ingredients')
      .set('Authorization', token)
      .send(testIngredients)
      .then(res => res.body)
      .then(savedIngredients => {
        assert.ok(savedIngredients[0]._id);
        testIngredients = savedIngredients;
      });
  });

  it('adding ingredients to fridge', () => {
    let fridgeItem = [testIngredients[0]._id, testIngredients[1]._id];

    return request.post('/me/fridge')
      .set('Authorization', token)
      .send(fridgeItem)
      .then(res => res.body)
      .then(fridgeArray => {
        assert.equal(fridgeArray, fridgeItem);
      });
  });

  // TODO: find out why we can't add an array of ingredients into the fridge field, only one item or else we get a single empty object'

  it('gets ingredients in fridge', () => {
    return request.get('/me/fridge')
      .set('Authorization', token)
      .then(res => res.body)
      .then(fridgeIngredients => {
        assert.equal(fridgeIngredients.length, 1);
      });

  });

});