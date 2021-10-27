'use strict';

const HTTP_STATUS_CODES = require('http-status-codes');
const DomainError = require('./domain-error');

class PaymentOptionNotFoundError extends DomainError {
  constructor(paymentOptionId) {
    super({
      statusCode: HTTP_STATUS_CODES.NOT_FOUND,
      message: 'Payment Option not found',
      errorData: { paymentOptionId }
    });
    this.name = 'PAYMENT_DOMAIN_PAYMENT_OPTION_NOT_FOUND_ERROR';
  }
}

module.exports = PaymentOptionNotFoundError;
