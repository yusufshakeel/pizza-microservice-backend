'use strict';

class DomainError extends Error {
  constructor({ statusCode, message, innerError, errorData, pspError }) {
    super(message);
    this.statusCode = statusCode;
    this.innerError = innerError;
    this.errorData = errorData;
    this.pspError = pspError;
  }
}

module.exports = DomainError;
