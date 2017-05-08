const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');


const schema = new Schema({
  
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

schema.static('exists', function (query) {
  return this.find(query)
    .count()
    .then(count => (count));
});

schema.method('generateHash', function (password) {
  this.hash = bcrypt.hashSync(password, 8);
});

schema.method('comparePassword', function (password) {
  return bcrypt.compareSync(password, this.hash);
});

module.exports = mongoose.model('User', schema);
