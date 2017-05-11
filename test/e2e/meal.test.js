const assert = require('chai').assert;
const db = require('./db');
const request = require('./request');

describe('/meals API', () => {

  before(db.drop);

  let token = '';
  let chefToken = '';

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

  const chef = {
    email: 'moooooooo@suuuup.com',
    password: 'ilovecows',
    chef: true
  };

  const user = {
    email: 'wannabechef@me.com',
    password: 'wishiwasachef'
  };

  before(() => {
    return request.post('/auth/signup')
      .send(chef)
      .then(res => chefToken = res.body.token);
  });

  before(() => {
    return request.post('/auth/signup')
      .send(user)
      .then(res => token = res.body.token);
  });

  before(() => {
    return request.post('/ingredients')
      .set('Authorization', chefToken)
      .send(testIngredients)
      .then(res => res.body)
      .then(saved => testIngredients = saved);
  });

  it('initial GET returns empty array', () => {
    return request.get('/meals')
      .set('Authorization', chefToken)
      .then(res => assert.deepEqual(res.body, []));
  });

  it('only chef can use meals route', () => {
    return request.get('/meals')
      .set('Authorization', token)
      .then(
          () => { throw new Error('success response not expected'); },
          (res) => { assert.equal(res.status, 401); }
      );
  });

  it('saves a meals', () => {
    return request.post('/meals')
      .set('Authorization', chefToken)
      .send(testMeals)
      .then(res => res.body)
      .then(saved => {
        assert.ok(saved[0]._id);
        testMeals = saved;
      });
  });
});
