const connect = require('../../lib/connect');

let connection = null;

before(() => {
  return connect('mongodb://localhost:27017/mealplan-test')
    .then(cn => connection = cn);
});

after(() => connection.close());