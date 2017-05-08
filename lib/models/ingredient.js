const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  ingredients: [{

    name: {
      type: String,
      required: true
    },
    category: {
      type: String,
      enum: ['protein', 'grains', 'veggies', 'misc'],
      required: true
    },
    expiration: {
      type: Date,
    }
  }]
});

module.exports = mongoose.model('Ingredient', schema);