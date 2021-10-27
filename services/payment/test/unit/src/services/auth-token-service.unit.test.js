'use strict';

const jwt = require('jsonwebtoken');
const AuthTokenService = require('../../../../src/services/auth-token-service');
const { JWT_SECRET } = require('../../../../src/constants');

const authTokenService = new AuthTokenService();

describe('verifyAuthToken', () => {
  describe('When token is valid', () => {
    const validToken = userId => {
      const now = Math.floor(Date.now() / 1000);
      return jwt.sign(
        {
          userId,
          iat: now,
          exp: now + 10
        },
        JWT_SECRET
      );
    };

    test('Should not throw error', () => {
      const token = validToken('87b96c89-5365-4cf0-a104-b28da006c2d7');
      const result = authTokenService.verifyAuthToken(token);
      expect(result).toStrictEqual({ userId: '87b96c89-5365-4cf0-a104-b28da006c2d7' });
    });
  });

  describe('When token is not valid', () => {
    test('Should throw error', () => {
      const invalidToken =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI4N2I5NmM4OS01MzY1LTRjZjAtYTEwNC1iMjhkYTAwNmMyZDciLCJpYXQiOjE2MzQzNTUwODcsImV4cCI6MTYzNDM1NTA4OH0.QUxXQxA8WrUoo16hpsr1WRcvoAzyAOsfk0hrLgzXeJg';
      expect(() => authTokenService.verifyAuthToken(invalidToken)).toThrow(
        'Auth token verification failed'
      );
    });
  });
});
