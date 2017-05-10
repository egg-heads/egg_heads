const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const getErrorHandler = require('./error-handlers/error-handler-simple');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.static('./public'));

const auth = require('./routes/auth');
const me = require('./routes/me');
const ingredients = require('./routes/ingredients');
const meals = require('./routes/meals');

app.use('/auth', auth);
app.use('/me', me);
app.use('/ingredients', ingredients);
app.use('/meals', meals);

app.use(getErrorHandler());

module.exports = app;