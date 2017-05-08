const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Ingredient = require('./ingredient');

const schema = new Schema({
  name: {
    type: String,
    required: true
  },
  ingredients: [{
    ingredients: [Ingredient.schema]
  }]
});

module.exports = mongoose.model('Meal', schema);