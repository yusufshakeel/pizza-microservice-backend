'use strict';
const swaggerPlugin = require('fastify-swagger');
const $RefParser = require('json-schema-ref-parser');
const areciboPlugin = require('arecibo');
const swaggerConfig = require('./configs/swagger-config');
const areciboConfig = require('./configs/arecibo-config');
const { HTTP_PORT, HTTP_HOST } = require('./constants');
const productRoutesV1 = require('./routes/v1/product-routes');
const ProductController = require('./controllers/product-controller');
const Repositories = require('./repositories');

module.exports = function Server({ fastify }) {
  const self = this;

  this.setup = async () => {
    const repositories = new Repositories({ parser: new $RefParser() });

    const schemaRepository = await repositories.schemaRepository.loadAll();
    const productRepository = repositories.productRepository;

    const productController = new ProductController({ productRepository });

    fastify.register(swaggerPlugin, swaggerConfig);
    fastify.register(areciboPlugin, areciboConfig);

    fastify.register(productRoutesV1, { productController, schemaRepository });
    return self;
  };

  this.run = async () => {
    await fastify.listen(HTTP_PORT, HTTP_HOST, function (err) {
      if (err) throw err;
      fastify.swagger();
    });
  };
};
