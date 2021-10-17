'use strict';

const HTTP_STATUS_CODES = require('http-status-codes');

module.exports = async function Routes(fastify, options) {
  const { controller, schemaRepository } = options;

  fastify.route({
    method: 'GET',
    url: '/product/v1/products',
    schema: {
      tags: ['APIs'],
      description: 'Fetch all product detail.',
      response: {
        200: schemaRepository.v1.products.fetchAll.response
      }
    },
    handler: async function (request, reply) {
      const products = await controller.fetchAll();
      reply.code(HTTP_STATUS_CODES.OK).send(products);
    }
  });

  fastify.route({
    method: 'GET',
    url: '/product/v1/products/:productId',
    schema: {
      tags: ['APIs'],
      description: 'Fetch product detail.',
      response: {
        200: schemaRepository.v1.products.fetchAll.response
      }
    },
    handler: async function (request, reply) {
      const product = await controller.fetchByProductId(request.params.productId);
      reply.code(HTTP_STATUS_CODES.OK).send(product);
    }
  });

  return fastify;
};
