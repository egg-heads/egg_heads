const assert = require('chai').assert;
const db = require('./db');
const request = require('./request');

describe.only('ingredients API', () => {

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
});