'use strict';
const ProductController = require('../../../src/controllers/product-controller');

test('Should be able to fetchAll products', async () => {
  const productRepository = {
    fetchAll: jest.fn(() => {
      return [
        {
          productId: 'c4035e9e-d241-4d22-93d9-b7f9e9a7a202',
          productName: 'Veg Pizza',
          productType: 'PIZZA'
        }
      ];
    })
  };
  const productController = new ProductController({ productRepository });
  const result = await productController.fetchAll();
  expect(result).toStrictEqual({
    data: {
      products: [
        {
          productId: 'c4035e9e-d241-4d22-93d9-b7f9e9a7a202',
          productName: 'Veg Pizza',
          productType: 'PIZZA'
        }
      ]
    }
  });
});
