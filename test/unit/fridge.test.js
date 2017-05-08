const Fridge = require('../../lib/models/fridge');

describe('fridge validation', () => {

  it('validates fridge', () => {
    const testFridge = new Fridge({
      ingredients: [{
        name: 'hamburger',
        category: 'protein'
      },
      {
        name: 'rice',
        category: 'grain'
      },
      {
        name: 'spinach',
        category: 'veggies'
      }]
    });
    return testFridge.validate();

  });
});