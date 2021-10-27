'use strict';

const HTTP_STATUS_CODES = require('http-status-codes');
const DomainError = require('./domain-error');

class StripePspError extends DomainError {
  constructor({ userId, paymentIntentId, paymentIntentMethodId, pspError }) {
    super({
      statusCode: HTTP_STATUS_CODES.BAD_GATEWAY,
      message: 'Stripe PSP error',
      errorData: { userId, paymentIntentId, paymentIntentMethodId },
      pspError
    });
    this.name = 'PAYMENT_DOMAIN_STRIPE_PSP_ERROR';
  }
}

module.exports = StripePspError;
