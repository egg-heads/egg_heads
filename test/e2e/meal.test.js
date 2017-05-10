const assert = require('chai').assert;
const db = require('./db');
const request = require('./request');

describe('/meals API', () => {

  before(db.drop);

  let token = '';

  let testMeals = [
    { name: 'grilled cheese' }, { name: 'salad' }, { name: 'seoul bowl' }
  ];

  let testIngredients = [{
    name: 'bread'
  },
  {
    name: 'cheese'
  },
  {
    name: 'cilantro'
  }];

  const user = {
    email: 'moooooooo@suuuup.com',
    password: 'ilovecows'
  };

  before(() => {
    return request.post('/auth/signup')
      .send(user)
      .then(res => token = res.body.token);
  });

  before(() => {
    return request.post('/ingredients')
      .set('Authorization', token)
      .send(testIngredients)
      .then(res => res.body)
      .then(saved => testIngredients = saved);
  });

  it('initial GET returns empty array', () => {
    return request.get('/meals')
      .set('Authorization', token)
      .then(res => assert.deepEqual(res.body, []));
  });
});
