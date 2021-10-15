'use strict';

const UserRepository = require('./user-repository');
const SchemaRepository = require('./schema-repository');

module.exports = function Repositories({ parser }) {
  this.userRepository = new UserRepository();
  this.schemaRepository = new SchemaRepository(parser);
};
