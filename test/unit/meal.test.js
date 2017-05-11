const assert = require('assert');
const Meal = require('../../lib/models/meal');
const expectedValidation = require('../helper/validation');

describe('meal validation', () => {

  it('validates a meal', () => {
    const testMeal = new Meal({
      name: 'grilled cheese',
      ingredients: ['5911f47f7f0c001e4ce4a963', '5911f47f7f0c001e4de4a963']
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
  });
});