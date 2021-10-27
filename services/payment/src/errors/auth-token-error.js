'use strict';

const HTTP_STATUS_CODES = require('http-status-codes');
const DomainError = require('./domain-error');

class AuthTokenError extends DomainError {
  constructor(message = 'Auth token error', error) {
    super({
      statusCode: HTTP_STATUS_CODES.FORBIDDEN,
      message,
      innerError: error
    });
    this.name = 'PAYMENT_DOMAIN_AUTH_TOKEN_ERROR';
  }
}

module.exports = AuthTokenError;
