const db = require('./db');
const request = require('./request');
const assert = require('chai').assert;

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
      return badRequest('/auth/signup', { password: 'catsrkewl' }, 401, 'email and password required');
    });

    it('signup requires password', () => {
      return badRequest('/auth/signup', { password: 'catsrkewl' }, 401, 'email and password required');
    });

    let token = '';

    it('signup', () => {
      return request
        .post('/auth/signup')
        .send(user)
        .then(res => assert.ok(token = res.body.token));
    });

    it('can\'t use same email', () => {
      return badRequest('/auth/signup', user, 400, 'username already exists');
    });

    it('signin requires email', () => {
      return badRequest('/auth/signin', { password: 'catsrkewl' }, 401, 'email and password required');
    });

    it('signin requires password', () => {
      return badRequest('/auth/signin', { email: 'beibs@me.com' }, 401, 'email and password required');
    });

    it('signin with wrong user', () => {
      return badRequest('/auth/signin', { email: 'beibs@me.com', password: user.password }, 401, 'invalid email or password');
    });

    it('signin with wrong password', () => {
      return badRequest('/auth/signin', { email: user.email, password: 'bad' }, 401, 'invalid email or password');
    });

    it('signin', () => {
      return request
        .post('/auth/signin')
        .send(user)
        .then(res => assert.ok(res.body.token));
    });

    it('token is invalid', () => {
      return request
        .get('/auth/verify')
        .set('Authorization', 'bad token')
        .then(
          () => { throw new Error('success response not expected'); },
          (res) => { assert.equal(res.status, 401); }
        );
    });

    it('token is valid', () => {
      return request
        .get('/auth/verify')
        .set('Authorization', token)
        .then(res => assert.ok(res.body));
    });
  });

  describe('Unauthorized', () => {

    it('401 with no token', () => {
      return request
        .get('/me')
        .then(
        () => { throw new Error('status should not be 200'); },
        res => {
          assert.equal(res.status, 401);
          assert.equal(res.response.body.error, 'no authorization found');
        }
        );
    });

    it('403 with invalid token', () => {
      return request
        .get('/me')
        .set('Authorization', 'bad token')
        .then(
        () => { throw new Error('status should not be 200'); },
        res => {
          assert.equal(res.status, 401);
          assert.equal(res.response.body.error, 'no authorization found');
        }
        );
    });
  });
});