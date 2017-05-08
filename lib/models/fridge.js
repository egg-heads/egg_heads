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
    },
    required: true
  }]

});

// Meal example:
// meal: {
//   name: chicken pasta,
//   ingredients: 
//     {
//       name: chicken
//       category: protein
//     },
//     {
//       name: noodle
//       category: grain 
//     }
// }    
module.exports = mongoose.model('Fridge', schema);