const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }, 
  meals: [{
    type: Schema.Types.ObjectId,
    ref: 'meal'
  }]
});

module.exports = mongoose.model('Admin', schema);