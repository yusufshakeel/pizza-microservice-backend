'use strict';
module.exports = function ProductController({ productRepository }) {
  this.fetchAll = async function fetchAll() {
    const products = await productRepository.fetchAll();
    return {
      data: {
        products
      }
    };
  };
};
