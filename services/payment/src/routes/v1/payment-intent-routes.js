'use strict';

const HTTP_STATUS_CODES = require('http-status-codes');

module.exports = function PaymentIntentRoutes(fastify, options) {
  const { controller, schemaRepository } = options;

  fastify.route({
    method: 'POST',
    url: '/payment/v1/payments/payment-intents',
    schema: {
      tags: ['APIs - Payment Intents'],
      description: 'Create a payment intent.',
      headers: schemaRepository.v1.payment.request.headers,
      body: schemaRepository.v1.payment.createPaymentIntent.request,
      response: {
        201: schemaRepository.v1.payment.createPaymentIntent.response
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
    url: '/payment/v1/payments/payment-intents/:paymentIntentId/commit',
    schema: {
      tags: ['APIs - Payment Intents'],
      description: 'Commit a payment intent.',
      headers: schemaRepository.v1.payment.request.headers,
      body: schemaRepository.v1.payment.emptyObject,
      response: {
        200: schemaRepository.v1.payment.commit.response
      }
    },
    handler: async function (request, reply) {
      const userId = request['x-user-id'];
      const paymentIntent = await controller.commitPaymentIntent(
        userId,
        request.params.paymentIntentId
      );
      reply.code(HTTP_STATUS_CODES.OK).send(paymentIntent);
    }
  });

  fastify.route({
    method: 'POST',
    url: '/payment/v1/payments/payment-intents/:paymentIntentId/charge',
    schema: {
      tags: ['APIs - Payment Intents'],
      description: 'Commit a payment intent.',
      headers: schemaRepository.v1.payment.request.headers,
      body: schemaRepository.v1.payment.emptyObject,
      response: {
        200: schemaRepository.v1.payment.charge.response
      }
    },
    handler: async function (request, reply) {
      const userId = request['x-user-id'];
      const paymentIntent = await controller.chargePaymentIntent(
        userId,
        request.params.paymentIntentId
      );
      reply.code(HTTP_STATUS_CODES.OK).send(paymentIntent);
    }
  });
};
