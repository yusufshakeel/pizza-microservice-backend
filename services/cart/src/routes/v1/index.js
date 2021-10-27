'use strict';

const HTTP_STATUS_CODES = require('http-status-codes');

module.exports = async function Routes(fastify, options) {
  const { controller, schemaRepository } = options;

  fastify.route({
    method: 'GET',
    url: '/cart/v1/carts/active',
    schema: {
      tags: ['APIs'],
      description: 'Fetch active cart detail.',
      headers: schemaRepository.v1.carts.request.headers,
      response: {
        200: schemaRepository.v1.carts.fetch.response
      }
    },
    handler: async function (request, reply) {
      const userId = request['x-user-id'];
      const cart = await controller.fetchActiveCartByUserId(userId);
      reply.code(HTTP_STATUS_CODES.OK).send(cart);
    }
  });

  fastify.route({
    method: 'GET',
    url: '/cart/v1/carts/:cartId',
    schema: {
      tags: ['APIs'],
      description: 'Fetch active cart detail.',
      headers: schemaRepository.v1.carts.request.headers,
      params: {
        type: 'object',
        required: ['cartId'],
        properties: {
          cartId: { type: 'string', format: 'uuid' }
        }
      },
      response: {
        200: schemaRepository.v1.carts.fetch.response
      }
    },
    handler: async function (request, reply) {
      const userId = request['x-user-id'];
      const cart = await controller.fetchCartById(userId, request.params.cartId);
      reply.code(HTTP_STATUS_CODES.OK).send(cart);
    }
  });

  fastify.route({
    method: 'POST',
    url: '/cart/v1/carts',
    schema: {
      tags: ['APIs'],
      description: 'Fetch active cart detail.',
      headers: schemaRepository.v1.carts.request.headers,
      body: schemaRepository.v1.carts.create.request,
      response: {
        201: schemaRepository.v1.carts.create.response
      }
    },
    handler: async function (request, reply) {
      const userId = request['x-user-id'];
      const cart = await controller.upsertCart(userId, request.body.data);
      reply.code(HTTP_STATUS_CODES.CREATED).send(cart);
    }
  });

  return fastify;
};
