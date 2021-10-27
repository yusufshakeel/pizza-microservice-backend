'use strict';

const RepositoryError = require('../errors/repository-error');

module.exports = function ProductRepository({ ProductModel, errorable = RepositoryError() }) {
  this.fetchAll = errorable(async function fetchAll() {
    const products = await ProductModel.find({ productStatus: 'ACTIVE' });
    if (!products?.length) {
      return null;
    }
    return { products };
  });

  this.fetchByProductId = errorable(async function fetchByProductId(productId) {
    return ProductModel.findOne({ productId, productStatus: 'ACTIVE' });
  });
};
