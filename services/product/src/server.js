'use strict';
const swaggerPlugin = require('fastify-swagger');
const areciboPlugin = require('arecibo');
const swaggerConfig = require('./configs/swagger-config');
const areciboConfig = require('./configs/arecibo-config');
const { HTTP_PORT, HTTP_HOST } = require('./constants');

module.exports = function Server({ fastify }) {
  const self = this;

  this.setup = async () => {
    fastify.register(swaggerPlugin, swaggerConfig);
    fastify.register(areciboPlugin, areciboConfig);
    return self;
  };

  this.run = async () => {
    await fastify.listen(HTTP_PORT, HTTP_HOST, function (err) {
      if (err) throw err;
      fastify.swagger();
    });
  };
};
