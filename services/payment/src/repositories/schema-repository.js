'use strict';

const path = require('path');
const { SCHEMA_LOCATION_V1 } = require('../constants/schema-constants');

module.exports = function SchemaRepository(parser) {
  const self = this;
  this.schemas = {};

  this.loadAll = async function () {
    const emptyObject = await parser.dereference(
      path.join(SCHEMA_LOCATION_V1, 'empty-object.json')
    );

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

    const fetchPaymentOptionParams = await parser.dereference(
      path.join(SCHEMA_LOCATION_V1, 'fetch-payment-option-params.json')
    );

    const fetchPaymentOptionResponse = await parser.dereference(
      path.join(SCHEMA_LOCATION_V1, 'fetch-payment-option-response.json')
    );

    const fetchAllPaymentOptionResponse = await parser.dereference(
      path.join(SCHEMA_LOCATION_V1, 'fetch-all-payment-option-response.json')
    );

    const createPaymentIntentMethodParams = await parser.dereference(
      path.join(SCHEMA_LOCATION_V1, 'payment-intent-method-create-params.json')
    );

    const createPaymentIntentMethodRequest = await parser.dereference(
      path.join(SCHEMA_LOCATION_V1, 'payment-intent-method-create-request.json')
    );

    const createPaymentIntentMethodResponse = await parser.dereference(
      path.join(SCHEMA_LOCATION_V1, 'payment-intent-method-create-response.json')
    );

    const paymentIntentCommitResponse = await parser.dereference(
      path.join(SCHEMA_LOCATION_V1, 'payment-intent-commit-response.json')
    );

    const v1Schemas = {
      payment: {
        emptyObject: emptyObject,
        request: {
          headers: paymentRequestHeader
        },
        createPaymentIntent: {
          request: createPaymentIntentRequest,
          response: paymentIntentIdResponse
        },
        createPaymentIntentMethod: {
          params: createPaymentIntentMethodParams,
          request: createPaymentIntentMethodRequest,
          response: createPaymentIntentMethodResponse
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
        },
        fetchPaymentOption: {
          params: fetchPaymentOptionParams,
          response: fetchPaymentOptionResponse
        },
        fetchAllPaymentOption: {
          response: fetchAllPaymentOptionResponse
        },
        commit: {
          response: paymentIntentCommitResponse
        }
      }
    };

    self.schemas = {
      v1: v1Schemas
    };

    return self.schemas;
  };
};
