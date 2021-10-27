'use strict';

const UserRepository = require('./user-repository');
const SchemaRepository = require('./schema-repository');
const { UserModel } = require('../models/user-model');
const RepositoryError = require('../errors/repository-error');

module.exports = function Repositories({ parser, errorable = RepositoryError() }) {
  this.userRepository = new UserRepository({ UserModel, errorable });
  this.schemaRepository = new SchemaRepository(parser);
};
