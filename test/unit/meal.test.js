const assert = require('assert');
const Meal = require('../../lib/models/meal');

const expectedValidation = () => { throw new Error('expected validation errors but did not get any'); };

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
  
  describe('validation failures', () => {

    it('requires a name', () => {
      const meal = new Meal();
      return meal.validate()
        .then(expectedValidation,
        err => {
          const errors = err.errors;
          assert.ok(errors.name && errors.name.kind === 'required');
        });  
    });

    it('returns an array of ingredients', () => {
      const meal = new Meal({});
      return meal.validate()
        .then(expectedValidation,
        err => {
          const errors = err.errors;
          assert.ok(errors.ingredients && errors.ingredients.kind === []);
        });
    });
  });
});