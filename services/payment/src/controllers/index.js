'use strict';

const { v4: uuidV4 } = require('uuid');
const PaymentIntentNotFoundError = require('../errors/payment-intent-not-found-error');
const PaymentIntentMethodNotFoundError = require('../errors/payment-intent-method-not-found-error');
const PaymentServiceProviderNotFoundError = require('../errors/payment-service-provider-not-found-error');
const PaymentOptionNotFoundError = require('../errors/payment-option-not-found-error');

const stripeCommitAction = require('../payment-service-providers/STRIPE/CREDIT_CARD/commit');
const stripeChargeAction = require('../payment-service-providers/STRIPE/CREDIT_CARD/charge');

module.exports = function Controller({ repositories, actionHandler }) {
  const { paymentIntentRepository, paymentServiceProviderRepository, paymentOptionRepository } =
    repositories;

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

  this.fetchAllPaymentServiceProvider = async function fetchAllPaymentServiceProvider() {
    const fetchedAllPaymentServiceProvider =
      await paymentServiceProviderRepository.fetchAllPaymentServiceProvider();
    if (!fetchedAllPaymentServiceProvider) {
      throw new PaymentServiceProviderNotFoundError();
    }
    return { data: { paymentServiceProviders: fetchedAllPaymentServiceProvider } };
  };

  this.fetchPaymentOptionById = async function fetchPaymentOptionById(paymentOptionId) {
    const fetchedPaymentOption = await paymentOptionRepository.fetchPaymentOptionById(
      paymentOptionId
    );
    if (!fetchedPaymentOption) {
      throw new PaymentOptionNotFoundError(paymentOptionId);
    }
    return { data: fetchedPaymentOption };
  };

  this.fetchAllPaymentOption = async function fetchAllPaymentOption() {
    const fetchedAllPaymentOption = await paymentOptionRepository.fetchAllPaymentOption();
    if (!fetchedAllPaymentOption) {
      throw new PaymentOptionNotFoundError();
    }
    return { data: { paymentOptions: fetchedAllPaymentOption } };
  };

  this.createPaymentIntent = async function createPaymentIntent(userId, paymentIntent) {
    const paymentIntentId = uuidV4();
    const createdPaymentIntent = await paymentIntentRepository.createPaymentIntent({
      ...paymentIntent,
      statuses: [{ status: 'CREATED' }],
      paymentIntentMethods: [],
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

  this.createPaymentIntentMethod = async function createPaymentIntentMethod(
    userId,
    paymentIntentId,
    paymentIntentMethod
  ) {
    const { paymentServiceProviderId, paymentOptionId, requestedAmount } = paymentIntentMethod;
    const { paymentServiceProvider, paymentOption } = await validateCreatePaymentIntentMethod({
      userId,
      paymentIntentId,
      paymentServiceProviderId,
      paymentOptionId
    });

    const paymentIntentMethodId = uuidV4();
    await paymentIntentRepository.createPaymentIntentMethod(userId, paymentIntentId, {
      requestedAmount,
      paymentServiceProvider: {
        paymentServiceProviderId: paymentServiceProvider.data.paymentServiceProviderId,
        paymentServiceProviderName: paymentServiceProvider.data.paymentServiceProviderName
      },
      paymentOption: {
        paymentOptionId: paymentOption.data.paymentOptionId,
        paymentOptionName: paymentOption.data.paymentOptionName
      },
      paymentIntentMethodId,
      statuses: [{ status: 'CREATED' }]
    });

    return { data: { paymentIntentId, paymentIntentMethodId, userId } };
  };

  const validateCreatePaymentIntentMethod = async ({
    userId,
    paymentIntentId,
    paymentServiceProviderId,
    paymentOptionId
  }) => {
    const [paymentServiceProvider, paymentOption, paymentIntent] = await Promise.all([
      this.fetchPaymentServiceProviderById(paymentServiceProviderId),
      this.fetchPaymentOptionById(paymentOptionId),
      this.fetchPaymentIntentById(userId, paymentIntentId)
    ]);
    return { paymentServiceProvider, paymentOption, paymentIntent };
  };

  this.commitPaymentIntent = async function commitPaymentIntent(userId, paymentIntentId) {
    const { data: paymentIntent } = await this.fetchPaymentIntentById(userId, paymentIntentId);
    if (!paymentIntent) {
      throw new PaymentIntentNotFoundError(userId, paymentIntentId);
    }
    if (!paymentIntent.paymentIntentMethods.length) {
      throw new PaymentIntentMethodNotFoundError({ userId, paymentIntentId });
    }

    if (paymentIntent.paymentIntentMethods[0].status === 'COMMITTED' && paymentIntent.paymentIntentMethods[0].pspData.clientSecret) {
      console.info(`Payment Intent ${paymentIntentId} is already committed.`);
      return {
        data: {
          paymentIntentId,
          pspResponse: { clientSecret: paymentIntent.paymentIntentMethods[0].pspData.clientSecret }
        }
      };
    }

    const { pspResponse, toSave } = await stripeCommitAction({
      data: { paymentIntent, paymentIntentMethod: paymentIntent.paymentIntentMethods[0] }
    });
    await paymentIntentRepository.commitPaymentIntent(userId, paymentIntentId, {
      paymentIntent,
      toSave
    });

    return {
      data: {
        paymentIntentId,
        pspResponse
      }
    };
  };

  this.chargePaymentIntent = async function chargePaymentIntent(userId, paymentIntentId) {
    const { data: paymentIntent } = await this.fetchPaymentIntentById(userId, paymentIntentId);
    if (!paymentIntent) {
      throw new PaymentIntentNotFoundError(userId, paymentIntentId);
    }
    if (!paymentIntent.paymentIntentMethods.length) {
      throw new PaymentIntentMethodNotFoundError({ userId, paymentIntentId });
    }

    if (paymentIntent.paymentIntentMethods[0].status === 'CHARGED') {
      console.info(`Payment Intent ${paymentIntentId} is already charged.`);
      return {
        data: {
          paymentIntentId
        }
      };
    }

    const { toSave } = await stripeChargeAction({
      data: { paymentIntent, paymentIntentMethod: paymentIntent.paymentIntentMethods[0] }
    });
    await paymentIntentRepository.chargePaymentIntent(userId, paymentIntentId, {
      paymentIntent,
      toSave
    });

    return {
      data: {
        paymentIntentId
      }
    };
  };
};
