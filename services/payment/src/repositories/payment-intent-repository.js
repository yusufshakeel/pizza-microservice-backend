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

  this.commitPaymentIntent = errorable(async function commitPaymentIntent(
    userId,
    paymentIntentId,
    data
  ) {
    const { toSave } = data;
    const status = { status: 'COMMITTED', eventTime: Date.now() };
    return PaymentIntentModel.updateOne(
      { userId, paymentIntentId },
      {
        $push: { statuses: status, 'paymentIntentMethods.0.statuses': status },
        $set: {
          updatedAt: Date.now(),
          'paymentIntentMethods.0.updatedAt': Date.now(),
          'paymentIntentMethods.0.pspData': toSave
        }
      }
    );
  });

  this.chargePaymentIntent = errorable(async function chargePaymentIntent(
    userId,
    paymentIntentId,
    data
  ) {
    const { toSave } = data;
    const status = { status: 'CHARGED', eventTime: Date.now() };
    return PaymentIntentModel.updateOne(
      { userId, paymentIntentId },
      {
        $push: { statuses: status, 'paymentIntentMethods.0.statuses': status },
        $set: {
          updatedAt: Date.now(),
          'paymentIntentMethods.0.updatedAt': Date.now(),
          'paymentIntentMethods.0.capturedAmount': toSave.capturedAmount,
          'paymentIntentMethods.0.capturedAmountAt': toSave.capturedAmountAt,
          'paymentIntentMethods.0.pspData': toSave
        }
      }
    );
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
