'use strict';

const HTTP_STATUS_CODES = require('http-status-codes');

module.exports = function PaymentIntentMethodRoutes(fastify, options) {
  const { controller, schemaRepository } = options;

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
};
