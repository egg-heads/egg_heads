const assert = require('chai').assert;
const db = require('./db');
const request = require('./request');

describe('ingredients API', () => {

  before(db.drop);

  let token = '';

  const user = {
    email: 'sup@suuuup.com',
    password: 'yippeeeee'
  };

  before(() => {
    return request.post('/auth/signup')
      .send(user)
      .then(res => token = res.body.token);
  });

  it('initial GET returns empty array', () => {
    return request.get('/ingredients')
      .set('Authorization', token)
      .then(res => assert.deepEqual(res.body, []));
  });

  let testIngredient = {
    name: 'cilantro'
  };
  let testIngredient2 = {
    name: 'beef'
  };

  it('saves an ingredient', () => {
    return request.post('/ingredients')
      .set('Authorization', token)
      .send(testIngredient)
      .then(res => res.body)
      .then(saved => {
        assert.ok(saved._id);
        testIngredient = saved;
      });
  });

  it('saves another ingredient', () => {
    return request.post('/ingredients')
      .set('Authorization', token)
      .send(testIngredient2)
      .then(res => res.body)
      .then(saved => {
        assert.ok(saved._id);
        testIngredient2 = saved;
      });
  });

  it('gets all ingredients', () => {
    return request.get('/ingredients')
      .set('Authorization', token)
      .then(res => res.body)
      .then(ingredients => {
        assert.equal(ingredients.length, 2);
        assert.equal(ingredients[0].name, 'cilantro');
      });
  });
});