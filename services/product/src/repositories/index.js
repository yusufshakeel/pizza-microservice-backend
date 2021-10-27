'use strict';

const ProductRepository = require('./product-repository');
const SchemaRepository = require('./schema-repository');
const { ProductModel } = require('../models/product-model');
const RepositoryError = require('../errors/repository-error');

module.exports = function Repositories({ parser, errorable = RepositoryError() }) {
  this.productRepository = new ProductRepository({ ProductModel, errorable });
  this.schemaRepository = new SchemaRepository(parser);
};
