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
    moldy: {
      type: Boolean,
      default: false
    },
    dateAdded: {
      type: Date,
      default: Date.now
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

schema.static('isItMoldy', function (req) {
  return this.findById(req.user.id)
    .lean()
    .select('-password')
    .populate('fridge.ingredient', '-__v')
    .then(user => {
      user.fridge.forEach(ingredient => {
        let currentTime = new Date();
        const originalTime = ingredient.dateAdded;
        const timePassed = currentTime - originalTime;
        if (timePassed > 1000 * 60 * 60 * 24 * 7) ingredient.moldy = true;
      });
      return user;
    });
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
