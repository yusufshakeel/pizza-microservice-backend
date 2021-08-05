'use strict';
const path = require('path');
const { SCHEMA_LOCATION_V1 } = require('../constants/schema-constants');

module.exports = function SchemaRepository(parser) {
  const self = this;
  this.schemas = {};

  this.loadAll = async function () {
    const fetchAllProductsResponse = await parser.dereference(
      path.join(SCHEMA_LOCATION_V1, 'product-fetch-all-response.json')
    );

    const v1Schemas = {
      products: {
        fetchAll: {
          response: fetchAllProductsResponse
        }
      }
    };

    self.schemas = {
      v1: v1Schemas
    };

    return self.schemas;
  };
};
