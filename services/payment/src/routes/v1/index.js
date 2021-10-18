'use strict';

const HTTP_STATUS_CODES = require('http-status-codes');

module.exports = async function Routes(fastify, options) {
  const { controller, schemaRepository } = options;

  fastify.route({
    method: 'GET',
    url: '/payment/v1/payments/payment-service-providers/:paymentServiceProviderId',
    schema: {
      tags: ['APIs - Payment Service Providers'],
      description: 'Fetch a payment intent.',
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
      description: 'Fetch a payment intent.',
      headers: schemaRepository.v1.payment.request.headers,
      response: {
        200: schemaRepository.v1.payment.fetchAllPaymentServiceProvider.response
      }
    },
    handler: async function (request, reply) {
      const paymentServiceProviders = await controller.fetchAllPaymentServiceProviderById();
      reply.code(HTTP_STATUS_CODES.OK).send(paymentServiceProviders);
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

  return fastify;
};
