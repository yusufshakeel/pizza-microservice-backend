'use strict';

const { v4: uuidV4 } = require('uuid');
const PaymentIntentNotFoundError = require('../errors/payment-intent-not-found-error');
const PaymentServiceProviderNotFoundError = require('../errors/payment-service-provider-not-found-error');

module.exports = function Controller({ repositories }) {
  const { paymentIntentRepository, paymentServiceProviderRepository } = repositories;

  this.fetchPaymentServiceProviderById = async function fetchPaymentServiceProviderById(
    paymentServiceProviderId
  ) {
    const fetchPaymentServiceProvider =
      await paymentServiceProviderRepository.fetchPaymentServiceProviderById(
        paymentServiceProviderId
      );
    if (!fetchPaymentServiceProvider) {
      throw new PaymentServiceProviderNotFoundError(paymentServiceProviderId);
    }
    return { data: fetchPaymentServiceProvider };
  };

  this.fetchAllPaymentServiceProviderById = async function fetchAllPaymentServiceProviderById() {
    const fetchedAllPaymentServiceProvider =
      await paymentServiceProviderRepository.fetchAllPaymentServiceProviderById();
    if (!fetchedAllPaymentServiceProvider) {
      throw new PaymentServiceProviderNotFoundError();
    }
    return { data: { paymentServiceProviders: fetchedAllPaymentServiceProvider } };
  };

  this.createPaymentIntent = async function createPaymentIntent(userId, paymentIntent) {
    const paymentIntentId = uuidV4();
    const createdPaymentIntent = await paymentIntentRepository.createPaymentIntent({
      ...paymentIntent,
      userId,
      paymentIntentId
    });
    return { data: { paymentIntentId: createdPaymentIntent.paymentIntentId } };
  };

  this.fetchPaymentIntentById = async function fetchPaymentIntentById(userId, paymentIntentId) {
    const fetchedPaymentIntent = await paymentIntentRepository.fetchPaymentIntentById(
      userId,
      paymentIntentId
    );
    if (!fetchedPaymentIntent) {
      throw new PaymentIntentNotFoundError(userId, paymentIntentId);
    }
    return { data: fetchedPaymentIntent };
  };
};
