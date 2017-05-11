const jwt = require('jsonwebtoken-promisified');

const appSecret = process.env.APP_Secret || 'freezer';

module.exports = {
  sign(user) {
    const payload = {
      id: user._id,
      chef: user.chef
    };

    return jwt.signAsync(payload, appSecret);
  },
  verify(token) {
    return jwt.verifyAsync(token, appSecret);
  }
};

