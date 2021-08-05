'use strict';
const $RefParser = require('json-schema-ref-parser');
const Repositories = require('../../../src/repositories');

test('Should return the need repositories', () => {
  const repositories = new Repositories({ parser: new $RefParser() });
  expect(Object.keys(repositories)).toStrictEqual(['productRepository', 'schemaRepository']);
});
