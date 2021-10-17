'use strict';

module.exports = {
  PROJECT_TITLE: 'Pizza Microservice',
  PROJECT_MICROSERVICE: 'Product Domain',
  HTTP_PORT: process.env.PRODUCT_HTTP_PORT || 10102,
  HTTP_HOST: process.env.PRODUCT_HTTP_HOST || '0.0.0.0',
  MONGODB_HOST: process.env.PRODUCT_MONGODB_HOST || '0.0.0.0',
  MONGODB_PORT: process.env.PRODUCT_MONGODB_PORT || 27017,
  MONGODB_USERNAME: process.env.PRODUCT_MONGODB_USERNAME ?? 'admin',
  MONGODB_PASSWORD: process.env.PRODUCT_MONGODB_PASSWORD ?? 'password',
  MONGODB_DB_NAME: process.env.PRODUCT_MONGODB_DB_NAME || 'pizza_product',
  DOMAIN_DIRECTORY: __dirname + '/../../'
};
