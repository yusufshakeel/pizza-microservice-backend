'use strict';

const HTTP_STATUS_CODES = require('http-status-codes');
const DomainError = require('./domain-error');

class DatabaseAccessError extends DomainError {
  constructor({ message = 'Database access error', innerError = {} }) {
    super({
      statusCode: HTTP_STATUS_CODES.SERVICE_UNAVAILABLE,
      message,
      innerError
    });
    this.name = 'PAYMENT_DOMAIN_DATABASE_ACCESS_ERROR';
  }
}

module.exports = DatabaseAccessError;
