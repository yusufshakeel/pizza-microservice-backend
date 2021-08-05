'use strict';
const ProductRepository = require('../../../src/repositories/product-repository');

test('Should fetch all products', async () => {
  const productRepository = new ProductRepository();
  const result = await productRepository.fetchAll();
  expect(result).toStrictEqual([
    {
      productId: 'c4035e9e-d241-4d22-93d9-b7f9e9a7a202',
      productName: 'Veg Pizza',
      productType: 'PIZZA'
    },
    {
      productId: 'c4135e9e-d241-4d22-93d9-b7f9e9a7a202',
      productName: 'Cheese Dip',
      productType: 'SIDE'
    },
    {
      productId: 'c4235e9e-d241-4d22-93d9-b7f9e9a7a202',
      productName: 'Pepsi 500ml',
      productType: 'BEVERAGE'
    },
    {
      productId: 'c4335e9e-d241-4d22-93d9-b7f9e9a7a202',
      productName: 'Chocolate Lava Cake',
      productType: 'DESSERT'
    }
  ]);
});
