// const assert = require('assert');
const User = require('../../lib/models/user');

describe('user validation', () => {

  it('validates a user', () => {
    
    const testUser = new User({
      username: 'mofo37',
      password: 'Ilovecows'
    });

    return testUser.validate();

  });
});

