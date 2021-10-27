'use strict';

const ErrorBuilder = require('../../../../src/builders/error-builder');
const UserNotFoundError = require('../../../../src/errors/user-not-found-error');

describe('ErrorBuilder', () => {
  const errorBuilder = new ErrorBuilder();

  describe('When error has statusCode and message', () => {
    test('Should return error', () => {
      const error = errorBuilder.build(
        new UserNotFoundError('87b96c89-5365-4cf0-a104-b28da006c2d7')
      );
      expect(error).toStrictEqual({
        code: 404,
        errors: {
          errors: [
            {
              code: 'USER_DOMAIN_USER_NOT_FOUND_ERROR',
              error: 'USER_DOMAIN_USER_NOT_FOUND_ERROR',
              errorData: { userId: '87b96c89-5365-4cf0-a104-b28da006c2d7' },
              message: 'User not found'
            }
          ]
        }
      });
    });
  });

  describe('When error handler matches', () => {
    test('Should return INTERNAL_SERVER_ERROR', () => {
      const error = errorBuilder.build(new Error('Some error'));
      expect(error).toStrictEqual({
        code: 500,
        errors: {
          errors: [
            {
              code: 'INTERNAL_SERVER_ERROR',
              error: 'INTERNAL_SERVER_ERROR',
              errorData: new Error('Some error'),
              message: 'INTERNAL_SERVER_ERROR'
            }
          ]
        }
      });
    });
  });
});
