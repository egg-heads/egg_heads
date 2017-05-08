const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  ingredients: [{
    type: String,
    
  }]

});

module.exports = mongoose.model('Fridge', schema);