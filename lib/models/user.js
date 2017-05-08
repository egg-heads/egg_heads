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
