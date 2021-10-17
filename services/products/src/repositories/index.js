'use strict';

const ProductRepository = require('./product-repository');
const SchemaRepository = require('./schema-repository');
const { ProductModel } = require('../models/product-model');

module.exports = function Repositories({ parser }) {
  this.productRepository = new ProductRepository({ ProductModel });
  this.schemaRepository = new SchemaRepository(parser);
};
