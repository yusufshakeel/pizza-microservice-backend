'use strict';

const CartRepository = require('./cart-repository');
const SchemaRepository = require('./schema-repository');
const { CartModel } = require('../models/cart-model');

module.exports = function Repositories({ parser }) {
  this.cartRepository = new CartRepository({ CartModel });
  this.schemaRepository = new SchemaRepository(parser);
};
