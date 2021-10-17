'use strict';

module.exports = {
  PROJECT_TITLE: 'Pizza Microservice',
  PROJECT_MICROSERVICE: 'User Domain',
  HTTP_PORT: process.env.USER_HTTP_PORT || 10101,
  HTTP_HOST: process.env.USER_HTTP_HOST || '0.0.0.0',
  MONGODB_HOST: process.env.USER_MONGODB_HOST || '0.0.0.0',
  MONGODB_PORT: process.env.USER_MONGODB_PORT || 27017,
  MONGODB_USERNAME: process.env.USER_MONGODB_USERNAME ?? 'admin',
  MONGODB_PASSWORD: process.env.USER_MONGODB_PASSWORD ?? 'password',
  MONGODB_DB_NAME: process.env.USER_MONGODB_DB_NAME || 'pizza_user',
  JWT_LIFESPAN: process.env.USER_JWT_LIFESPAN || 3600,
  JWT_SECRET: process.env.USER_JWT_SECRET || 'secret',
  PASSWORD_SALT_ROUND: 10,
  DOMAIN_DIRECTORY: __dirname + '/../../'
};
