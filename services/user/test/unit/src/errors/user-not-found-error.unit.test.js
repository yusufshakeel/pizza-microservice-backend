'use strict';

const UserNotFoundError = require('../../../../src/errors/user-not-found-error');

describe('UserNotFoundError', () => {
  test('Should create error', () => {
    const error = new UserNotFoundError('87b96c89-5365-4cf0-a104-b28da006c2d7');
    expect(error.statusCode).toBe(404);
    expect(error.message).toBe('User not found');
    expect(error.name).toBe('USER_DOMAIN_USER_NOT_FOUND_ERROR');
    expect(error.errorData).toStrictEqual({ userId: '87b96c89-5365-4cf0-a104-b28da006c2d7' });
  });
});
