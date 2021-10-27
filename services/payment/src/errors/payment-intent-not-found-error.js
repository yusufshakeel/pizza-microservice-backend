'use strict';

const HTTP_STATUS_CODES = require('http-status-codes');
const DomainError = require('./domain-error');

class PaymentIntentNotFoundError extends DomainError {
  constructor(userId, paymentIntentId) {
    super({
      statusCode: HTTP_STATUS_CODES.NOT_FOUND,
      message: 'Payment Intent not found',
      errorData: { userId, paymentIntentId }
    });
    this.name = 'PAYMENT_DOMAIN_PAYMENT_INTENT_NOT_FOUND_ERROR';
  }
}

module.exports = PaymentIntentNotFoundError;
