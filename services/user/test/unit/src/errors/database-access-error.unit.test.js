'use strict';

const DatabaseAccessError = require('../../../../src/errors/database-access-error');

describe('DatabaseAccessError', () => {
  test('Should create error', () => {
    const error = new DatabaseAccessError({
      message: 'Some error',
      innerError: { innerErr: 'err' }
    });
    expect(error.statusCode).toBe(503);
    expect(error.message).toBe('Some error');
    expect(error.name).toBe('USER_DOMAIN_DATABASE_ACCESS_ERROR');
    expect(error.innerError).toStrictEqual({ innerErr: 'err' });
  });

  test('Should create error without params', () => {
    const error = new DatabaseAccessError({});
    expect(error.statusCode).toBe(503);
    expect(error.message).toBe('Database access error');
    expect(error.name).toBe('USER_DOMAIN_DATABASE_ACCESS_ERROR');
    expect(error.innerError).toStrictEqual({});
  });
});
