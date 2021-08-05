'use strict';
const ProductRepository = require('./product-repository');
const SchemaRepository = require('./schema-repository');

module.exports = function Repositories({ parser }) {
  this.productRepository = new ProductRepository();
  this.schemaRepository = new SchemaRepository(parser);
};
