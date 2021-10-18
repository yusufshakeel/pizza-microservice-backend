'use strict';

const HTTP_STATUS_CODES = require('http-status-codes');

module.exports = async function Routes(fastify, options) {
  const { controller, schemaRepository } = options;

  fastify.route({
    method: 'GET',
    url: '/payment/v1/payments/payment-service-providers/:paymentServiceProviderId',
    schema: {
      tags: ['APIs - Payment Service Providers'],
      description: 'Fetch a payment service provider',
      headers: schemaRepository.v1.payment.request.headers,
      params: schemaRepository.v1.payment.fetchPaymentServiceProvider.params,
      response: {
        200: schemaRepository.v1.payment.fetchPaymentServiceProvider.response
      }
    },
    handler: async function (request, reply) {
      const paymentServiceProvider = await controller.fetchPaymentServiceProviderById(
        request.params.paymentServiceProviderId
      );
      reply.code(HTTP_STATUS_CODES.OK).send(paymentServiceProvider);
    }
  });

  fastify.route({
    method: 'GET',
    url: '/payment/v1/payments/payment-service-providers',
    schema: {
      tags: ['APIs - Payment Service Providers'],
      description: 'Fetch all payment service providers.',
      headers: schemaRepository.v1.payment.request.headers,
      response: {
        200: schemaRepository.v1.payment.fetchAllPaymentServiceProvider.response
      }
    },
    handler: async function (request, reply) {
      const paymentServiceProviders = await controller.fetchAllPaymentServiceProvider();
      reply.code(HTTP_STATUS_CODES.OK).send(paymentServiceProviders);
    }
  });

  fastify.route({
    method: 'GET',
    url: '/payment/v1/payments/payment-options/:paymentOptionId',
    schema: {
      tags: ['APIs - Payment Options'],
      description: 'Fetch a payment option.',
      headers: schemaRepository.v1.payment.request.headers,
      params: schemaRepository.v1.payment.fetchPaymentOption.params,
      response: {
        200: schemaRepository.v1.payment.fetchPaymentOption.response
      }
    },
    handler: async function (request, reply) {
      const paymentOption = await controller.fetchPaymentOptionById(request.params.paymentOptionId);
      reply.code(HTTP_STATUS_CODES.OK).send(paymentOption);
    }
  });

  fastify.route({
    method: 'GET',
    url: '/payment/v1/payments/payment-options',
    schema: {
      tags: ['APIs - Payment Options'],
      description: 'Fetch all payment options.',
      headers: schemaRepository.v1.payment.request.headers,
      response: {
        200: schemaRepository.v1.payment.fetchAllPaymentOption.response
      }
    },
    handler: async function (request, reply) {
      const paymentOptions = await controller.fetchAllPaymentOption();
      reply.code(HTTP_STATUS_CODES.OK).send(paymentOptions);
    }
  });

  fastify.route({
    method: 'POST',
    url: '/payment/v1/payments/payment-intents',
    schema: {
      tags: ['APIs - Payment Intents'],
      description: 'Create a payment intent.',
      headers: schemaRepository.v1.payment.request.headers,
      body: schemaRepository.v1.payment.createPaymentIntent.request,
      response: {
        200: schemaRepository.v1.payment.createPaymentIntent.response
      }
    },
    handler: async function (request, reply) {
      const userId = request['x-user-id'];
      const paymentIntent = await controller.createPaymentIntent(userId, request.body.data);
      reply.code(HTTP_STATUS_CODES.CREATED).send(paymentIntent);
    }
  });

  fastify.route({
    method: 'GET',
    url: '/payment/v1/payments/payment-intents/:paymentIntentId',
    schema: {
      tags: ['APIs - Payment Intents'],
      description: 'Fetch a payment intent.',
      headers: schemaRepository.v1.payment.request.headers,
      params: schemaRepository.v1.payment.fetchPaymentIntent.params,
      response: {
        200: schemaRepository.v1.payment.fetchPaymentIntent.response
      }
    },
    handler: async function (request, reply) {
      const userId = request['x-user-id'];
      const paymentIntent = await controller.fetchPaymentIntentById(
        userId,
        request.params.paymentIntentId
      );
      reply.code(HTTP_STATUS_CODES.OK).send(paymentIntent);
    }
  });

  fastify.route({
    method: 'POST',
    url: '/payment/v1/payments/payment-intents/:paymentIntentId/payment-intent-methods',
    schema: {
      tags: ['APIs - Payment Intent Methods'],
      description: 'Create a payment intent method.',
      headers: schemaRepository.v1.payment.request.headers,
      params: schemaRepository.v1.payment.createPaymentIntentMethod.params,
      body: schemaRepository.v1.payment.createPaymentIntentMethod.request,
      response: {
        200: schemaRepository.v1.payment.createPaymentIntentMethod.response
      }
    },
    handler: async function (request, reply) {
      const userId = request['x-user-id'];
      const paymentIntentMethod = await controller.createPaymentIntentMethod(
        userId,
        request.params.paymentIntentId,
        request.body.data
      );
      reply.code(HTTP_STATUS_CODES.CREATED).send(paymentIntentMethod);
    }
  });

  return fastify;
};
