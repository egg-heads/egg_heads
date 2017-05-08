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
  admin: {
    type: Boolean,
    default: false,
    required: true
  },
  fridge: {
    type: Schema.Types.ObjectId,
    ref: 'fridge'
  },
  meals: [],
  favorites: []
});

module.exports = mongoose.model('User', schema);
