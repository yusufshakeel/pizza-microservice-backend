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
const ErrorHandlerMiddleware = require('./middlewares/error-handler-middleware');
const AuthTokenHook = require('./hooks/auth-token-hook');

module.exports = function Server({ fastify }) {
  const self = this;

  this.setup = async () => {
    const repositories = new Repositories({ parser: new $RefParser() });

    const schemaRepository = await repositories.schemaRepository.loadAll();
    const { cartRepository } = repositories;

    const controller = new Controllers({ cartRepository });

    fastify.addHook('preHandler', AuthTokenHook);
    fastify.setErrorHandler(new ErrorHandlerMiddleware());
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
