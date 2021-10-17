'use strict';

const ProductNotFoundError = require('../errors/product-not-found-error');

module.exports = function Controller({ productRepository }) {
  this.fetchAll = async function fetchAll() {
    const fetchedProducts = await productRepository.fetchAll();
    if (!fetchedProducts) {
      throw new ProductNotFoundError();
    }
    return { data: fetchedProducts };
  };

  this.fetchByProductId = async function fetchByProductId(productId) {
    const fetchedProduct = await productRepository.fetchByProductId(productId);
    if (!fetchedProduct) {
      throw new ProductNotFoundError(productId);
    }
    return { data: { products: [fetchedProduct] } };
  };
};
