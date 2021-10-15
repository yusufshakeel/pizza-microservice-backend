'use strict';

const HTTP_STATUS_CODES = require('http-status-codes');
const DomainError = require('./domain-error');

class UserNotFoundError extends DomainError {
  constructor(userId) {
    super({
      statusCode: HTTP_STATUS_CODES.NOT_FOUND,
      message: 'User not found',
      errorData: { userId }
    });
    this.name = 'USER_DOMAIN_USER_NOT_FOUND_ERROR';
  }
}

module.exports = UserNotFoundError;
