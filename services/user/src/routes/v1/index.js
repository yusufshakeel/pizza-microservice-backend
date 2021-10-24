'use strict';

const HTTP_STATUS_CODES = require('http-status-codes');

module.exports = async function Routes(fastify, options) {
  const { controller, schemaRepository } = options;

  fastify.route({
    method: 'GET',
    url: '/user/v1/users/account',
    schema: {
      tags: ['APIs'],
      description: 'Fetch user account detail.',
      headers: schemaRepository.v1.users.request.headers,
      response: {
        200: schemaRepository.v1.users.fetchUserById.response
      }
    },
    handler: async function (request, reply) {
      const userId = request['x-user-id'];
      const user = await controller.fetchUserById(userId);
      reply.code(HTTP_STATUS_CODES.OK).send(user);
    }
  });

  fastify.route({
    method: 'POST',
    url: '/user/v1/users/signup/email-available',
    schema: {
      tags: ['APIs'],
      description: 'Check if email is available for sign up.',
      body: schemaRepository.v1.users.signUp.emailAvailable.request,
      response: {
        200: schemaRepository.v1.users.signUp.emailAvailable.response
      }
    },
    handler: async function (request, reply) {
      const result = await controller.isEmailAvailableForSignUp(request.body.data.emailAddress);
      reply.code(HTTP_STATUS_CODES.OK).send(result);
    }
  });

  fastify.route({
    method: 'POST',
    url: '/user/v1/users/signup/contact-phone-available',
    schema: {
      tags: ['APIs'],
      description: 'Check if contact phone is available for sign up.',
      body: schemaRepository.v1.users.signUp.contactPhoneAvailable.request,
      response: {
        200: schemaRepository.v1.users.signUp.contactPhoneAvailable.response
      }
    },
    handler: async function (request, reply) {
      const result = await controller.isContactPhoneAvailableForSignUp(
        request.body.data.contactPhone
      );
      reply.code(HTTP_STATUS_CODES.OK).send(result);
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
    handler: async function (request, reply) {
      const user = await controller.signUp(request.body.data);
      reply.code(HTTP_STATUS_CODES.CREATED).send(user);
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
    handler: async function (request, reply) {
      const user = await controller.logIn(request.body.data);
      reply.code(HTTP_STATUS_CODES.OK).send(user);
    }
  });

  fastify.route({
    method: 'PATCH',
    url: '/user/v1/users/account/password',
    schema: {
      tags: ['APIs'],
      description: 'Update user password.',
      headers: schemaRepository.v1.users.request.headers,
      body: schemaRepository.v1.users.patchPassword.request,
      response: {
        200: schemaRepository.v1.users.patchPassword.response
      }
    },
    handler: async function (request, reply) {
      const user = await controller.updatePassword(
        request['x-user-id'],
        request.body.data.password
      );
      reply.code(HTTP_STATUS_CODES.OK).send(user);
    }
  });

  fastify.route({
    method: 'PATCH',
    url: '/user/v1/users/account',
    schema: {
      tags: ['APIs'],
      description: 'Update user detail.',
      headers: schemaRepository.v1.users.request.headers,
      body: schemaRepository.v1.users.patch.request,
      response: {
        200: schemaRepository.v1.users.patch.response
      }
    },
    handler: async function (request, reply) {
      const user = await controller.update(request['x-user-id'], request.body.data);
      reply.code(HTTP_STATUS_CODES.OK).send(user);
    }
  });

  return fastify;
};
