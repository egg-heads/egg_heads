const connection = require('mongoose').connection;
const request = require('./request');

module.exports = {
  drop() {
    return connection.dropDatabase();
  }
};