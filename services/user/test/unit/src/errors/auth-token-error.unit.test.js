'use strict';

const AuthTokenError = require('../../../../src/errors/auth-token-error');

describe('AuthTokenError', () => {
  test('Should create error', () => {
    const error = new AuthTokenError('Some error', { error: 'err' });
    expect(error.statusCode).toBe(403);
    expect(error.message).toBe('Some error');
    expect(error.name).toBe('USER_DOMAIN_AUTH_TOKEN_ERROR');
    expect(error.innerError).toStrictEqual({ error: 'err' });
  });

  test('Should create error without any params', () => {
    const error = new AuthTokenError();
    expect(error.statusCode).toBe(403);
    expect(error.message).toBe('Auth token error');
    expect(error.name).toBe('USER_DOMAIN_AUTH_TOKEN_ERROR');
  });
});
