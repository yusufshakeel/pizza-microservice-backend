'use strict';

const jwt = require('jsonwebtoken');
const AuthTokenHook = require('../../../../src/hooks/auth-token-hook');
const { JWT_SECRET } = require('../../../../src/constants');

describe('AuthTokenHook', () => {
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

  describe('API paths that does not need auth token', () => {
    describe('When url path is for liveness', () => {
      test('Should not throw error', () => {
        const request = { raw: { url: '/liveness', method: 'GET' } };
        const reply = jest.fn();
        const done = jest.fn();
        expect(() => AuthTokenHook(request, reply, done)).not.toThrow();
      });
    });
  });

  describe('API paths that does need auth token', () => {
    describe('When auth token is absent', () => {
      test('Should throw error', () => {
        const request = {
          raw: {
            url: '/payment/v1/payments/payment-intents/87b96c89-5365-4cf0-a104-b28da006c2d7',
            method: 'GET'
          }
        };
        const reply = jest.fn();
        const done = jest.fn();
        expect(() => AuthTokenHook(request, reply, done)).toThrow('Auth failed!');
      });
    });

    describe('When auth token is present', () => {
      describe('For valid auth token', () => {
        test('Should not throw error', () => {
          const token = validToken('87b96c89-5365-4cf0-a104-b28da006c2d7');
          const request = {
            raw: {
              url: '/payment/v1/payments/payment-intents/87b96c89-5365-4cf0-a104-b28da006c2d7',
              method: 'GET'
            },
            headers: { authorization: `Bearer ${token}` }
          };
          const reply = jest.fn();
          const done = jest.fn();
          expect(() => AuthTokenHook(request, reply, done)).not.toThrow();
        });
      });

      describe('For invalid auth token', () => {
        test('Should not throw error', () => {
          const request = {
            raw: {
              url: '/payment/v1/payments/payment-intents/87b96c89-5365-4cf0-a104-b28da006c2d7',
              method: 'GET'
            },
            headers: {
              authorization:
                'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI4N2I5NmM4OS01MzY1LTRjZjAtYTEwNC1iMjhkYTAwNmMyZDciLCJpYXQiOjE2MzQzNTUwODcsImV4cCI6MTYzNDM1NTA4OH0.QUxXQxA8WrUoo16hpsr1WRcvoAzyAOsfk0hrLgzXeJg'
            }
          };
          const reply = jest.fn();
          const done = jest.fn();
          expect(() => AuthTokenHook(request, reply, done)).toThrow('Auth failed!');
        });
      });
    });
  });
});
