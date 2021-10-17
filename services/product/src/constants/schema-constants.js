'use strict';

const { DOMAIN_DIRECTORY } = require('./index');

const SCHEMA_API_LOCATION = DOMAIN_DIRECTORY + 'src/schemas/api';

module.exports = {
  SCHEMA_LOCATION_V1: `${SCHEMA_API_LOCATION}/v1`
};
