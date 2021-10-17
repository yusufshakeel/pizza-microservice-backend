'use strict';

const HTTP_STATUS_CODES = require('http-status-codes');
const DomainError = require('./domain-error');

class ProductNotFoundError extends DomainError {
  constructor(productId) {
    super({
      statusCode: HTTP_STATUS_CODES.NOT_FOUND,
      message: 'Product not found',
      errorData: { productId }
    });
    this.name = 'PRODUCT_DOMAIN_PRODUCT_NOT_FOUND_ERROR';
  }
}

module.exports = ProductNotFoundError;
