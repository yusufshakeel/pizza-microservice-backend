'use strict';

const mongoose = require('mongoose');
const fastify = require('fastify')({
  logger: true
});
const Server = require('./server');
const {
  MONGODB_HOST,
  MONGODB_PORT,
  MONGODB_USERNAME,
  MONGODB_PASSWORD,
  MONGODB_DB_NAME
} = require('./constants');

mongoose
  .connect(`mongodb://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@${MONGODB_HOST}:${MONGODB_PORT}`, {
    dbName: MONGODB_DB_NAME
  })
  .then(() => {
    console.info('Connected to MongoDB database.');
  })
  .catch(err => {
    console.error(err);
    throw new Error('FATAL ERROR: Failed to connect to the MongoDB database.');
  });

new Server({ fastify }).setup().then(server => server.run());
