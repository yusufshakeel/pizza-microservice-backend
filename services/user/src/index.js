'use strict';
const Server = require('./server');
const fastify = require('fastify')({
  logger: true
});
new Server({ fastify }).setup().then(server => server.run());
