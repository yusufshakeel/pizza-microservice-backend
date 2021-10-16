'use strict';

module.exports = {
  PROJECT_TITLE: 'Pizza Microservice',
  PROJECT_MICROSERVICE: 'User Domain',
  HTTP_PORT: process.env.HTTP_PORT || 10101,
  HTTP_HOST: process.env.HTTP_HOST || '0.0.0.0',
  MONGODB_HOST: process.env.MONGODB_HOST || '0.0.0.0',
  MONGODB_PORT: process.env.MONGODB_PORT || 27017,
  MONGODB_USERNAME: process.env.MONGODB_USERNAME || 'admin',
  MONGODB_PASSWORD: process.env.MONGODB_PASSWORD || 'root1234',
  MONGODB_DB_NAME: process.env.MONGODB_DB_NAME || 'pizza_user',
  DOMAIN_DIRECTORY: __dirname + '/../../',
  PASSWORD_SALT_ROUND: 10,
  JWT_LIFESPAN: process.env.JWT_LIFESPAN || 600,
  JWT_SECRET: process.env.JWT_SECRET || 'secret'
};
