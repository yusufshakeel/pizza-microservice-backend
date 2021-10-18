'use strict';

const RepositoryError = require('../errors/repository-error');

module.exports = function PaymentOptionRepository({
  PaymentOptionModel,
  errorable = RepositoryError()
}) {
  this.fetchPaymentOptionById = errorable(async function fetchPaymentOptionById(paymentOptionId) {
    return PaymentOptionModel.findOne({ paymentOptionId, paymentOptionStatus: 'ACTIVE' });
  });

  this.fetchAllPaymentOption = errorable(async function fetchAllPaymentOption() {
    return PaymentOptionModel.find({ paymentOptionStatus: 'ACTIVE' });
  });
};
