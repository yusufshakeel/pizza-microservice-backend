'use strict';

const PaymentIntentRepository = require('./payment-intent-repository');
const PaymentServiceProviderRepository = require('./payment-service-provider-repository');
const PaymentOptionRepository = require('./payment-option-repository');
const SchemaRepository = require('./schema-repository');
const { PaymentIntentModel } = require('../models/payment-intent-model');
const { PaymentServiceProviderModel } = require('../models/payment-service-provider-model');
const { PaymentOptionModel } = require('../models/payment-option-model');
const RepositoryError = require('../errors/repository-error');

module.exports = function Repositories({ parser, errorable = RepositoryError() }) {
  this.paymentIntentRepository = new PaymentIntentRepository({ PaymentIntentModel, errorable });
  this.paymentServiceProviderRepository = new PaymentServiceProviderRepository({
    PaymentServiceProviderModel,
    errorable
  });
  this.paymentOptionRepository = new PaymentOptionRepository({
    PaymentOptionModel,
    errorable
  });
  this.schemaRepository = new SchemaRepository(parser);
};
