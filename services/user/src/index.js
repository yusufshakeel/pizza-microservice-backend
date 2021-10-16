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

async function dbCon() {
  const mongoOption = { dbName: MONGODB_DB_NAME };
  const mongoUrl = `mongodb://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@${MONGODB_HOST}:${MONGODB_PORT}`;
  try {
    await mongoose.connect(mongoUrl, mongoOption);
    console.info('Connected to MongoDB database.');
  } catch (err) {
    console.error('FATAL ERROR: Failed to connect to the MongoDB database.');
    console.error(err);
  }
}

dbCon();

new Server({ fastify }).setup().then(server => server.run());
