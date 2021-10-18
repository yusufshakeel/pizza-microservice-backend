'use strict';

const PaymentIntentRepository = require('./payment-intent-repository');
const PaymentServiceProviderRepository = require('./payment-service-provider-repository');
const SchemaRepository = require('./schema-repository');
const { PaymentIntentModel } = require('../models/payment-intent-model');
const { PaymentServiceProviderModel } = require('../models/payment-service-provider-model');
const RepositoryError = require('../errors/repository-error');

module.exports = function Repositories({ parser, errorable = RepositoryError() }) {
  this.paymentIntentRepository = new PaymentIntentRepository({ PaymentIntentModel, errorable });
  this.paymentServiceProviderRepository = new PaymentServiceProviderRepository({
    PaymentServiceProviderModel,
    errorable
  });
  this.schemaRepository = new SchemaRepository(parser);
};
