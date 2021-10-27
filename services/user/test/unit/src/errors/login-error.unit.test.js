'use strict';

const LogInError = require('../../../../src/errors/login-error');

describe('LogInError', () => {
  test('Should create error', () => {
    const error = new LogInError({
      err: 'err'
    });
    expect(error.statusCode).toBe(403);
    expect(error.message).toBe('Log in details are incorrect');
    expect(error.name).toBe('USER_DOMAIN_USER_LOGIN_ERROR');
    expect(error.errorData).toStrictEqual({ err: 'err' });
  });
});
