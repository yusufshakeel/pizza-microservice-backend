'use strict';

const HTTP_STATUS_CODES = require('http-status-codes');

module.exports = async function Routes(fastify, options) {
  const { controller, schemaRepository } = options;

  fastify.route({
    method: 'GET',
    url: '/user/v1/users/:userId',
    schema: {
      tags: ['APIs'],
      description: 'Fetch user detail.',
      params: schemaRepository.v1.users.fetchUserById.params,
      response: {
        200: schemaRepository.v1.users.fetchUserById.response
      }
    },
    handler: async function(request, reply) {
      const { userId } = request.params;
      const user = await controller.fetchUserById(userId);
      reply.code(HTTP_STATUS_CODES.OK).send(user);
    }
  });

  fastify.route({
    method: 'POST',
    url: '/user/v1/users',
    schema: {
      tags: ['APIs'],
      description: 'Sign up user.',
      body: schemaRepository.v1.users.signUp.request,
      response: {
        200: schemaRepository.v1.users.signUp.response
      }
    },
    handler: async function(request, reply) {
      const user = await controller.signUp(request.body.data);
      reply.code(HTTP_STATUS_CODES.OK).send(user);
    }
  });

  fastify.route({
    method: 'POST',
    url: '/user/v1/users/login',
    schema: {
      tags: ['APIs'],
      description: 'Log in user.',
      body: schemaRepository.v1.users.logIn.request,
      response: {
        200: schemaRepository.v1.users.logIn.response
      }
    },
    handler: async function(request, reply) {
      const user = await controller.logIn(request.body.data);
      reply.code(HTTP_STATUS_CODES.OK).send(user);
    }
  });

  fastify.route({
    method: 'PATCH',
    url: '/user/v1/users/:userId/password',
    schema: {
      tags: ['APIs'],
      description: 'Update user password.',
      params: schemaRepository.v1.users.patchPassword.params,
      body: schemaRepository.v1.users.patchPassword.request,
      response: {
        200: schemaRepository.v1.users.patchPassword.response
      }
    },
    handler: async function(request, reply) {
      const user = await controller.updatePassword(request.params.userId, request.body.data.password);
      reply.code(HTTP_STATUS_CODES.OK).send(user);
    }
  });

  fastify.route({
    method: 'PATCH',
    url: '/user/v1/users/:userId',
    schema: {
      tags: ['APIs'],
      description: 'Update user detail.',
      params: schemaRepository.v1.users.patch.params,
      body: schemaRepository.v1.users.patch.request,
      response: {
        200: schemaRepository.v1.users.patch.response
      }
    },
    handler: async function(request, reply) {
      const user = await controller.update(request.params.userId, request.body.data);
      reply.code(HTTP_STATUS_CODES.OK).send(user);
    }
  });

  return fastify;
};
