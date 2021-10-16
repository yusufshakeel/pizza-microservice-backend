'use strict';

const { createAuthToken, verifyAuthToken } = require('../../../../src/services/auth-token-service');

describe('createAuthToken', () => {
  test('Should create auth token', () => {
    const token = createAuthToken('87b96c89-5365-4cf0-a104-b28da006c2d7');
    expect(token).not.toBeUndefined();
  });
});

describe('verifyAuthToken', () => {
  describe('When toke is valid', () => {
    test('Should not throw error', () => {
      const token = createAuthToken('87b96c89-5365-4cf0-a104-b28da006c2d7');
      const result = verifyAuthToken(token);
      expect(result).toStrictEqual({ userId: '87b96c89-5365-4cf0-a104-b28da006c2d7' });
    });
  });

  describe('When toke is not valid', () => {
    test('Should throw error', () => {
      const invalidToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI4N2I5NmM4OS01MzY1LTRjZjAtYTEwNC1iMjhkYTAwNmMyZDciLCJpYXQiOjE2MzQzNTUwODcsImV4cCI6MTYzNDM1NTA4OH0.QUxXQxA8WrUoo16hpsr1WRcvoAzyAOsfk0hrLgzXeJg';
      expect(() => verifyAuthToken(invalidToken)).toThrow('Auth token verification failed');
    });
  });
});