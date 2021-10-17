'use strict';

const AuthTokenHook = require('../../../../src/hooks/auth-token-hook');
const AuthTokenService = require('../../../../src/services/auth-token-service');

describe('AuthTokenHook', () => {
  const authTokenService = new AuthTokenService();

  describe('API paths that does not need auth token', () => {
    describe('When url path is for sign up', () => {
      test('Should not throw error', () => {
        const request = { raw: { url: '/user/v1/users', method: 'POST' } };
        const reply = jest.fn();
        const done = jest.fn();
        expect(() => AuthTokenHook(request, reply, done)).not.toThrow();
      });
    });

    describe('When url path is for log in', () => {
      test('Should not throw error', () => {
        const request = { raw: { url: '/user/v1/users/login', method: 'POST' } };
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
            url: '/user/v1/users/87b96c89-5365-4cf0-a104-b28da006c2d7',
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
          const token = authTokenService.createAuthToken('87b96c89-5365-4cf0-a104-b28da006c2d7');
          const request = {
            raw: {
              url: '/user/v1/users/87b96c89-5365-4cf0-a104-b28da006c2d7',
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
              url: '/user/v1/users/87b96c89-5365-4cf0-a104-b28da006c2d7',
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
