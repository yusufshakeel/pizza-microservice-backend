'use strict';

const CartRepository = require('./cart-repository');
const SchemaRepository = require('./schema-repository');
const { CartModel } = require('../models/cart-model');
const RepositoryError = require('../errors/repository-error');

module.exports = function Repositories({ parser, errorable = RepositoryError() }) {
  this.cartRepository = new CartRepository({ CartModel, errorable });
  this.schemaRepository = new SchemaRepository(parser);
};
