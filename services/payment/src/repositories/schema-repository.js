'use strict';

const path = require('path');
const { SCHEMA_LOCATION_V1 } = require('../constants/schema-constants');

module.exports = function SchemaRepository(parser) {
  const self = this;
  this.schemas = {};

  this.loadAll = async function () {
    const paymentRequestHeader = await parser.dereference(
      path.join(SCHEMA_LOCATION_V1, 'payment-request-headers.json')
    );

    const createPaymentIntentRequest = await parser.dereference(
      path.join(SCHEMA_LOCATION_V1, 'payment-intent-create-request.json')
    );

    const paymentIntentResponse = await parser.dereference(
      path.join(SCHEMA_LOCATION_V1, 'payment-intent-response.json')
    );

    const paymentIntentIdResponse = await parser.dereference(
      path.join(SCHEMA_LOCATION_V1, 'payment-intent-id-response.json')
    );

    const fetchPaymentIntentParams = await parser.dereference(
      path.join(SCHEMA_LOCATION_V1, 'fetch-payment-intent-params.json')
    );

    const fetchPaymentServiceProviderParams = await parser.dereference(
      path.join(SCHEMA_LOCATION_V1, 'fetch-payment-service-provider-params.json')
    );

    const fetchPaymentServiceProviderResponse = await parser.dereference(
      path.join(SCHEMA_LOCATION_V1, 'fetch-payment-service-provider-response.json')
    );

    const fetchAllPaymentServiceProviderResponse = await parser.dereference(
      path.join(SCHEMA_LOCATION_V1, 'fetch-all-payment-service-provider-response.json')
    );

    const v1Schemas = {
      payment: {
        request: {
          headers: paymentRequestHeader
        },
        createPaymentIntent: {
          request: createPaymentIntentRequest,
          response: paymentIntentIdResponse
        },
        fetchPaymentIntent: {
          params: fetchPaymentIntentParams,
          response: paymentIntentResponse
        },
        fetchPaymentServiceProvider: {
          params: fetchPaymentServiceProviderParams,
          response: fetchPaymentServiceProviderResponse
        },
        fetchAllPaymentServiceProvider: {
          response: fetchAllPaymentServiceProviderResponse
        }
      }
    };

    self.schemas = {
      v1: v1Schemas
    };

    return self.schemas;
  };
};
