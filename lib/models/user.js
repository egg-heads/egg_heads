const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const schema = new Schema({

  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  chef: {
    type: Boolean,
    default: false
  },
  fridge: [{
    ingredient: {
      type: Schema.Types.ObjectId,
      ref: 'Ingredient'
    },
    expiration: {
      type: Date
    },
    _id: false
  }],
  favorites: [{
    meal: {
      type: Schema.Types.ObjectId,
      ref: 'Meal'
    },
    _id: false
  }]
});

schema.static('exists', function (query) {
  return this.find(query)
    .count()
    .then(count => (count));
});

schema.static('getFridge', function (id) {
  return this.findById(id)
    .lean()
    .select('fridge')
    .populate('fridge.ingredient', '-__v')
    .then(user => user.fridge);
});

schema.method('generateHash', function (password) {
  this.password = bcrypt.hashSync(password, 8);
});

schema.method('comparePassword', function (password) {
  return bcrypt.compareSync(password, this.password);
});

module.exports = mongoose.model('User', schema);
