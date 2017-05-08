const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ingredient = require('./ingredient');

const schema = new Schema({
  ingredient: [ingredient.schema]
});
  
module.exports = mongoose.model('Fridge', schema);