const Meal = require('../../lib/models/meal');

describe('meal validation', () => {

  it('validates a meal', () => {
    const testMeal = new Meal({
      name: 'grilled cheese',
      ingredients:[{
        name: 'bread',
        category: 'grain'
      },
      {
        name: 'cheese',
        category: 'protein'
      }]
    });
    return testMeal.validate();
  });
});