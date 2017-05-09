const Ingredient = require('../../lib/models/ingredient');


describe('ingredient validation', () => {

  it.only('validates an ingredient', () => {
    const testIngredient = new Ingredient({
      name: 'carrot',
    });

    return testIngredient.validate();

  });
});