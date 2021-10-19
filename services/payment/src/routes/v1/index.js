'use strict';

const HTTP_STATUS_CODES = require('http-status-codes');

const PaymentOptionRoutes = require('./payment-option-routes');
const PaymentServiceProviderRoutes = require('./payment-service-provider-routes');
const PaymentIntentRoutes = require('./payment-intent-routes');
const PaymentIntentMethodRoutes = require('./payment-intent-method-routes');

module.exports = async function Routes(fastify, options) {
  PaymentServiceProviderRoutes(fastify, options);
  PaymentOptionRoutes(fastify, options);
  PaymentIntentRoutes(fastify, options);
  PaymentIntentMethodRoutes(fastify, options)
  return fastify;
};
