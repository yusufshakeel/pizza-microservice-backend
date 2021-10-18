'use strict';

const RepositoryError = require('../errors/repository-error');

module.exports = function PaymentIntentRepository({
  PaymentIntentModel,
  errorable = RepositoryError()
}) {
  this.fetchPaymentIntentById = errorable(async function fetchPaymentIntentById(
    userId,
    paymentIntentId
  ) {
    return PaymentIntentModel.findOne({ userId, paymentIntentId });
  });

  this.createPaymentIntent = errorable(async function createPaymentIntent(paymentIntent) {
    const paymentIntentModel = PaymentIntentModel(paymentIntent);
    return await paymentIntentModel.save();
  });

  this.createPaymentIntentMethod = errorable(async function createPaymentIntentMethod(
    userId,
    paymentIntentId,
    paymentIntentMethod
  ) {
    return await PaymentIntentModel.updateOne(
      {
        userId,
        paymentIntentId
      },
      { $push: { paymentIntentMethods: paymentIntentMethod } }
    );
  });
};