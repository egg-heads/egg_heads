const connection = require('mongoose').connection;
const request = require('./request');

module.exports = {
  drop() {
    return connection.dropDatabase();
  },
  getToken(user = { email: 'moooooo@me.com', password: 'ilovecows' }) {
    return request.post('/auth/signup')
      .send(user)
      .then(res => res.body.token);
  }
};