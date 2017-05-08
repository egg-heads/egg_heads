const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ingredient = require('./ingredient');


const schema = new Schema({
  name: {
    type: String,
    required: true
  },
  ingredients: [{
    ingredients: [ingredient.schema]
  }]
});

module.exports = mongoose.model('Meal', schema);