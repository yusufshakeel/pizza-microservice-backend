'use strict';

const RepositoryError = require('../errors/repository-error');

module.exports = function PaymentServiceProviderRepository({
  PaymentServiceProviderModel,
  errorable = RepositoryError()
}) {
  this.fetchPaymentServiceProviderById = errorable(async function fetchPaymentServiceProviderById(
    paymentServiceProviderId
  ) {
    return PaymentServiceProviderModel.findOne({
      paymentServiceProviderId,
      paymentServiceProviderStatus: 'ACTIVE'
    });
  });

  this.fetchAllPaymentServiceProvider = errorable(async function fetchAllPaymentServiceProvider() {
    return PaymentServiceProviderModel.find({ paymentServiceProviderStatus: 'ACTIVE' });
  });
};
