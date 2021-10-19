'use strict';

const HTTP_STATUS_CODES = require("http-status-codes");

module.exports = function PaymentOptionRoutes(fastify, options) {
  const { controller, schemaRepository } = options;

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
};