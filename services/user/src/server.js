'use strict';
const swaggerPlugin = require('fastify-swagger');
const $RefParser = require('json-schema-ref-parser');
const areciboPlugin = require('arecibo');
const swaggerConfig = require('./configs/swagger-config');
const areciboConfig = require('./configs/arecibo-config');
const { HTTP_PORT, HTTP_HOST } = require('./constants');
const RoutesV1 = require('./routes/v1');
const Controllers = require('./controllers');
const Repositories = require('./repositories');
const ErrorHandler = require('./errors/error-handler');

module.exports = function Server({ fastify }) {
  const self = this;

  this.setup = async () => {
    const repositories = new Repositories({ parser: new $RefParser() });

    const schemaRepository = await repositories.schemaRepository.loadAll();
    const { userRepository } = repositories;

    const controller = new Controllers({ userRepository });

    fastify.setErrorHandler(new ErrorHandler());
    fastify.register(swaggerPlugin, swaggerConfig);
    fastify.register(areciboPlugin, areciboConfig);

    fastify.register(RoutesV1, { controller, schemaRepository });
    return self;
  };

  this.run = async () => {
    await fastify.listen(HTTP_PORT, HTTP_HOST, function (err) {
      if (err) throw err;
      fastify.swagger();
    });
  };
};
