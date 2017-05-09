const db = require('./db');
const request = require('./request');
const assert = require('chai').assert;
const user = require('../../lib/models/user');

describe('auth tests', () => {
  let token = '';

  before(db.drop);

  const user = {
    email: 'mofo37@me.com',
    password: 'catsrkewl'
  };

  describe('user management', () => {

    const badRequest = (url, data, code, error) => {
      return request
        .post(url)
        .send(data)
        .then(
        () => { throw new Error('status should not be okay'); },
        res => {
          assert.equal(res.status, code);
          assert.equal(res.response.body.error, error);
        });
    };

    it('signup requires email', () => {
      return badRequest('/auth/signup', { password: 'catsrkewl' }, 400, 'email and password required');
    });
  });
});