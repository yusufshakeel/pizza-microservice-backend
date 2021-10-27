'use strict';

module.exports = {
  PROJECT_TITLE: 'Pizza Microservice',
  PROJECT_MICROSERVICE: 'Cart Domain',
  HTTP_PORT: process.env.CART_HTTP_PORT || 10103,
  HTTP_HOST: process.env.CART_HTTP_HOST || '0.0.0.0',
  MONGODB_HOST: process.env.CART_MONGODB_HOST || '0.0.0.0',
  MONGODB_PORT: process.env.CART_MONGODB_PORT || 27017,
  MONGODB_USERNAME: process.env.CART_MONGODB_USERNAME ?? 'admin',
  MONGODB_PASSWORD: process.env.CART_MONGODB_PASSWORD ?? 'password',
  MONGODB_DB_NAME: process.env.CART_MONGODB_DB_NAME || 'pizza_cart',
  JWT_SECRET: process.env.CART_JWT_SECRET || 'secret',
  DOMAIN_DIRECTORY: __dirname + '/../../'
};
