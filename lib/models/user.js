const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema ({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
    required: true
  },
  fridge: {
    type: Schema.Types.ObjectId,
    ref: 'fridge'
  },
  meals: [{
    type: Schema.Types.ObjectId,
    ref: 'meal'
  }],
  favorites: [{
    type: Schema.Types.ObjectId,
    ref: 'meal'
  }]
});

module.exports = mongoose.model('user', schema);