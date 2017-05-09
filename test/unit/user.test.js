const assert = require('assert');
const User = require('../../lib/models/user');
const expectedValidation = require('../helper/validation');


describe('user validation', () => {

  it('validates a user', () => {

    const testUser = new User({
      username: 'mofo37',
      password: 'Ilovecows'
    });
    return testUser.validate();
  });

  describe('validation failures', () => {

    it('requires a username', () => {
      const user = new User();
      return user.validate()
        .then(expectedValidation,
        err => {
          const errors = err.errors;
          assert.ok(errors.name && errors.name.kind === 'required');
        });
    });
  });
});