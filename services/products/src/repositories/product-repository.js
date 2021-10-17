'use strict';

module.exports = function ProductRepository({ ProductModel }) {
  this.fetchAll = async function fetchAll() {
    const products = await ProductModel.find({ productStatus: 'ACTIVE' });
    if (!products?.length) {
      return null;
    }
    return { products };
  };

  this.fetchByProductId = async function fetchByProductId(productId) {
    return ProductModel.findOne({ productId, productStatus: 'ACTIVE' });
  };
};
