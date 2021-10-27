'use strict';

const HTTP_STATUS_CODES = require('http-status-codes');
const DomainError = require('./domain-error');

class LogInError extends DomainError {
  constructor(error) {
    super({
      statusCode: HTTP_STATUS_CODES.FORBIDDEN,
      message: 'Log in details are incorrect',
      errorData: error
    });
    this.name = 'USER_DOMAIN_USER_LOGIN_ERROR';
  }
}

module.exports = LogInError;
