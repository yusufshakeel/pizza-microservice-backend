'use strict';

const $RefParser = require('json-schema-ref-parser');
const Repositories = require('../../../../src/repositories');

const repositories = new Repositories({ parser: new $RefParser() });

describe('Repositories', () => {
  test('Should have the needed repositories', () => {
    expect(repositories.paymentIntentRepository).not.toBeUndefined();
    expect(repositories.paymentServiceProviderRepository).not.toBeUndefined();
    expect(repositories.paymentOptionRepository).not.toBeUndefined();
    expect(repositories.schemaRepository).not.toBeUndefined();
  });
});
