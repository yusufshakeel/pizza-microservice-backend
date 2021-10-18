'use strict';

module.exports = {
  PROJECT_TITLE: 'Pizza Microservice',
  PROJECT_MICROSERVICE: 'Payment Domain',
  HTTP_PORT: process.env.PAYMENT_HTTP_PORT || 10104,
  HTTP_HOST: process.env.PAYMENT_HTTP_HOST || '0.0.0.0',
  MONGODB_HOST: process.env.PAYMENT_MONGODB_HOST || '0.0.0.0',
  MONGODB_PORT: process.env.PAYMENT_MONGODB_PORT || 27017,
  MONGODB_USERNAME: process.env.PAYMENT_MONGODB_USERNAME ?? 'admin',
  MONGODB_PASSWORD: process.env.PAYMENT_MONGODB_PASSWORD ?? 'password',
  MONGODB_DB_NAME: process.env.PAYMENT_MONGODB_DB_NAME || 'pizza_payment',
  JWT_SECRET: process.env.PAYMENT_JWT_SECRET || 'secret',
  DOMAIN_DIRECTORY: __dirname + '/../../'
};
