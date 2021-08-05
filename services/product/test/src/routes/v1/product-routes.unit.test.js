'use strict';
const fastify = require('fastify')();
const $RefParser = require('json-schema-ref-parser');
const productRoutesV1 = require('../../../../src/routes/v1/product-routes');
const PaymentController = require('../../../../src/controllers/product-controller');
const SchemaRepository = require('../../../../src/repositories/schema-repository');

beforeAll(async () => {
  const schemaRepository = await new SchemaRepository(new $RefParser()).loadAll();
  const productRepository = {
    fetchAll: jest.fn(async () => {
      return [
        {
          productId: 'c4035e9e-d241-4d22-93d9-b7f9e9a7a202',
          productName: 'Veg Pizza',
          productType: 'PIZZA'
        }
      ];
    })
  };
  const productController = new PaymentController({ productRepository });
  await productRoutesV1(fastify, { productController, schemaRepository });
});

test('Should be able to fetch all products', async () => {
  const response = await fastify.inject({
    method: 'GET',
    url: '/v1/products'
  });
  expect(response.statusCode).toBe(200);
});
