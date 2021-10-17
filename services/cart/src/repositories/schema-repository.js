'use strict';

const path = require('path');
const { SCHEMA_LOCATION_V1 } = require('../constants/schema-constants');

module.exports = function SchemaRepository(parser) {
  const self = this;
  this.schemas = {};

  this.loadAll = async function () {
    const fetchCartResponse = await parser.dereference(
      path.join(SCHEMA_LOCATION_V1, 'cart-fetch-response.json')
    );

    const cartRequestHeader = await parser.dereference(
      path.join(SCHEMA_LOCATION_V1, 'cart-request-headers.json')
    );

    const cartCreateRequest = await parser.dereference(
      path.join(SCHEMA_LOCATION_V1, 'cart-create-request.json')
    );

    const v1Schemas = {
      carts: {
        request: {
          headers: cartRequestHeader
        },
        fetch: {
          response: fetchCartResponse
        },
        create: {
          request: cartCreateRequest,
          response: fetchCartResponse
        }
      }
    };

    self.schemas = {
      v1: v1Schemas
    };

    return self.schemas;
  };
};
