'use strict';

const HTTP_STATUS_CODES = require('http-status-codes');

module.exports = function PaymentServiceProviderRoutes(fastify, options) {
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
};
