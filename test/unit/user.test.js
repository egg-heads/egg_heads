const assert = require('assert');
const User = require('../../lib/models/user');
const expectedValidation = require('../helper/validation');


describe('user validation', () => {

  it('validates a user', () => {

    const testUser = new User({
      email: 'mofo37',
      password: 'Ilovecows'
    });
    return testUser.validate();
  });

  describe('validation failures', () => {

    it('requires a password', () => {
      const user = new User();
      return user.validate()
        .then(expectedValidation,
        err => {
          const errors = err.errors;
          assert.ok(errors.password && errors.password.kind === 'required');
        });
    });

    it('requires an email', () => {
      const user = new User();
      return user.validate()
        .then(expectedValidation,
        err => {
          const errors = err.errors;
          assert.ok(errors.email && errors.email.kind === 'required');
        });
    });
  });
});