const Ingredient = require('../../lib/models/ingredient');


describe('ingredient validation', () => {

  it('validates an ingredient', () => {
    const testIngredient = new Ingredient({

      ingredients: [{
        name: 'carrot',
        category: 'veggies'
      }]
    });

    return testIngredient.validate();

  });
});