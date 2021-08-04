'use strict';

module.exports = {
  PROJECT_TITLE: 'Pizza Microservice',
  PROJECT_MICROSERVICE: 'Product Domain',
  HTTP_PORT: process.env.PIZZA_MICROSERVICE_PRODUCT_HTTP_PORT || 10101,
  HTTP_HOST: process.env.PIZZA_MICROSERVICE_PRODUCT_HTTP_HOST || 'localhost'
};
