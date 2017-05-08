const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Ingredient = require('./ingredient');

const schema = new Schema({
  ingredient: [Ingredient.schema]
});
  
module.exports = mongoose.model('Fridge', schema);