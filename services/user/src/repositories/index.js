'use strict';

const UserRepository = require('./user-repository');
const SchemaRepository = require('./schema-repository');
const { UserModel } = require('../models/user-model');

module.exports = function Repositories({ parser }) {
  this.userRepository = new UserRepository({ UserModel });
  this.schemaRepository = new SchemaRepository(parser);
};
