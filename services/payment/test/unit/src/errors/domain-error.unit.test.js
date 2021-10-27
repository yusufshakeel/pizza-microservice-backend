'use strict';

const DomainError = require('../../../../src/errors/domain-error');

describe('DomainError', () => {
  test('Should create error', () => {
    const error = new DomainError({
      statusCode: 404,
      message: 'Not found',
      innerError: { err: 'err' },
      errorData: { err: 'err' }
    });
    expect(error.statusCode).toBe(404);
    expect(error.message).toBe('Not found');
    expect(error.name).toBe('Error');
    expect(error.innerError).toStrictEqual({ err: 'err' });
    expect(error.errorData).toStrictEqual({ err: 'err' });
  });
});
