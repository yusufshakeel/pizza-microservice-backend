'use strict';

const HTTP_STATUS_CODES = require('http-status-codes');
const DomainError = require('./domain-error');

class PaymentIntentMethodNotFoundError extends DomainError {
  constructor({ userId, paymentIntentId, paymentIntentMethodId }) {
    super({
      statusCode: HTTP_STATUS_CODES.NOT_FOUND,
      message: 'Payment Intent Method not found',
      errorData: { userId, paymentIntentId, paymentIntentMethodId }
    });
    this.name = 'PAYMENT_DOMAIN_PAYMENT_INTENT_METHOD_NOT_FOUND_ERROR';
  }
}

module.exports = PaymentIntentMethodNotFoundError;
