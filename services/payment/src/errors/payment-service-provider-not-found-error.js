'use strict';

const HTTP_STATUS_CODES = require('http-status-codes');
const DomainError = require('./domain-error');

class PaymentServiceProviderNotFoundError extends DomainError {
  constructor(paymentServiceProviderId) {
    super({
      statusCode: HTTP_STATUS_CODES.NOT_FOUND,
      message: 'Payment Service Provider not found',
      errorData: { paymentServiceProviderId }
    });
    this.name = 'PAYMENT_DOMAIN_PAYMENT_SERVICE_PROVIDER_NOT_FOUND_ERROR';
  }
}

module.exports = PaymentServiceProviderNotFoundError;
