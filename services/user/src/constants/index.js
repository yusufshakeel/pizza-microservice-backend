'use strict';

module.exports = {
  PROJECT_TITLE: 'Pizza Microservice',
  PROJECT_MICROSERVICE: 'User Domain',
  HTTP_PORT: process.env.HTTP_PORT || 10101,
  HTTP_HOST: process.env.HTTP_HOST || '0.0.0.0',
  DOMAIN_DIRECTORY: __dirname + '/../../',
  PASSWORD_SALT_ROUND: 10,
  JWT_LIFESPAN: process.env.JWT_LIFESPAN || 600,
  JWT_SECRET: process.env.JWT_SECRET || 'secret'
};
