'use strict';
module.exports = async function ProductRoutes(fastify, options) {
  const { productController, schemaRepository } = options;

  fastify.route({
    method: 'GET',
    url: '/v1/products',
    schema: {
      tags: ['APIs'],
      response: {
        200: schemaRepository.v1.products.fetchAll.response
      }
    },
    handler: async function () {
      return productController.fetchAll();
    }
  });

  return fastify;
};
