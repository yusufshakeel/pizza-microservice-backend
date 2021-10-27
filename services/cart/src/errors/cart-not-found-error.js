'use strict';

const HTTP_STATUS_CODES = require('http-status-codes');
const DomainError = require('./domain-error');

class CartNotFoundError extends DomainError {
  constructor({ userId, cartId }) {
    super({
      statusCode: HTTP_STATUS_CODES.NOT_FOUND,
      message: 'Cart not found',
      errorData: { userId, cartId }
    });
    this.name = 'CART_DOMAIN_CART_NOT_FOUND_ERROR';
  }
}

module.exports = CartNotFoundError;
