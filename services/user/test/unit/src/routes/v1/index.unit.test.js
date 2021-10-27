'use strict';

const fastify = require('fastify')();
const $RefParser = require('json-schema-ref-parser');
const routes = require('../../../../../src/routes/v1/index');
const Controller = require('../../../../../src/controllers');
const SchemaRepository = require('../../../../../src/repositories/schema-repository');
const PasswordService = require('../../../../../src/services/password-service');
const AuthTokenService = require('../../../../../src/services/auth-token-service');

const passwordService = new PasswordService();
const authTokenService = new AuthTokenService();

const hashedPassword = passwordService.hashPassword('root1234');

const userRepository = {
  signUp: jest.fn(() => {
    return {
      userId: '87b96c89-5365-4cf0-a104-b28da006c2d7'
    };
  }),
  fetchUserById: jest.fn(() => {
    return {
      userId: '87b96c89-5365-4cf0-a104-b28da006c2d7',
      firstName: 'Jane',
      lastName: 'Doe',
      emailAddress: 'johndoe@example.com',
      contactPhone: {
        countryCode: '91',
        phoneNumber: '9800098000'
      },
      address: {
        line1: 'Address line 1',
        line2: 'Address line 2',
        line3: 'Address line 3',
        city: 'Bangalore',
        state: 'KA',
        country: 'IND',
        postcode: '560001'
      },
      accountStatus: 'ACTIVE',
      createdAt: '2021-10-16T12:11:17.643Z',
      updatedAt: '2021-10-16T12:17:31.796Z'
    };
  }),
  logIn: jest.fn(() => {
    return {
      userId: '87b96c89-5365-4cf0-a104-b28da006c2d7',
      password: hashedPassword
    };
  }),
  updatePassword: jest.fn(() => {
    return {
      userId: '87b96c89-5365-4cf0-a104-b28da006c2d7'
    };
  }),
  update: jest.fn(() => {
    return {
      userId: '87b96c89-5365-4cf0-a104-b28da006c2d7'
    };
  }),
  isEmailAvailableForSignUp: jest.fn(() => {
    return { userId: '87b96c89-5365-4cf0-a104-b28da006c2d7' };
  }),
  isContactPhoneAvailableForSignUp: jest.fn(() => {
    return { userId: '87b96c89-5365-4cf0-a104-b28da006c2d7' };
  })
};

beforeAll(async () => {
  const schemaRepository = await new SchemaRepository(new $RefParser()).loadAll();
  const controller = new Controller({ userRepository });
  await routes(fastify, { controller, schemaRepository });
});

describe('Routes /v1/users', () => {
  describe('Email available for sign up', () => {
    test('Should be able to confirm availability of email', async () => {
      const response = await fastify.inject({
        method: 'POST',
        url: '/user/v1/users/signup/email-available',
        headers: {
          'Content-Type': 'application/json'
        },
        payload: {
          data: {
            emailAddress: 'johndoe@example.com'
          }
        }
      });
      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.payload)).toStrictEqual({
        data: {
          isAvailable: expect.any(Boolean)
        }
      });
    });
  });

  describe('Contact phone available for sign up', () => {
    test('Should be able to confirm availability of contactPhone', async () => {
      const response = await fastify.inject({
        method: 'POST',
        url: '/user/v1/users/signup/contact-phone-available',
        headers: {
          'Content-Type': 'application/json'
        },
        payload: {
          data: {
            contactPhone: {
              countryCode: '91',
              phoneNumber: '9800098000'
            }
          }
        }
      });
      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.payload)).toStrictEqual({
        data: {
          isAvailable: expect.any(Boolean)
        }
      });
    });
  });

  describe('Sign up route', () => {
    test('Should create user', async () => {
      const response = await fastify.inject({
        method: 'POST',
        url: '/user/v1/users',
        headers: {
          'Content-Type': 'application/json'
        },
        payload: {
          data: {
            firstName: 'John',
            lastName: 'Doe',
            emailAddress: 'johndoe@example.com',
            password: 'root1234',
            contactPhone: {
              countryCode: '91',
              phoneNumber: '9800098000'
            },
            address: {
              line1: 'Address line 1',
              line2: 'Address line 2',
              line3: 'Address line 3',
              city: 'Bangalore',
              state: 'KA',
              country: 'IND',
              postcode: '560001'
            }
          }
        }
      });
      expect(response.statusCode).toBe(201);
      expect(JSON.parse(response.payload)).toStrictEqual({
        data: {
          userId: '87b96c89-5365-4cf0-a104-b28da006c2d7'
        }
      });
    });
  });

  describe('Log in route', () => {
    test('Should log in', async () => {
      const response = await fastify.inject({
        method: 'POST',
        url: '/user/v1/users/login',
        headers: {
          'Content-Type': 'application/json'
        },
        payload: {
          data: {
            emailAddress: 'johndoe@example.com',
            password: 'root1234'
          }
        }
      });
      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.payload)).toStrictEqual({
        data: {
          userId: '87b96c89-5365-4cf0-a104-b28da006c2d7',
          token: expect.any(String)
        }
      });
    });
  });

  describe('Fetch logged in user', () => {
    test('Should return user details', async () => {
      const token = authTokenService.createAuthToken('87b96c89-5365-4cf0-a104-b28da006c2d7');
      const response = await fastify.inject({
        method: 'GET',
        url: '/user/v1/users/account',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });
      expect(response.statusCode).toBe(200);
    });
  });

  describe('Update password', () => {
    test('Should be able to update', async () => {
      const token = authTokenService.createAuthToken('87b96c89-5365-4cf0-a104-b28da006c2d7');
      const response = await fastify.inject({
        method: 'PATCH',
        url: '/user/v1/users/account/password',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        payload: {
          data: {
            password: 'root1234'
          }
        }
      });
      expect(response.statusCode).toBe(200);
    });
  });

  describe('Update details', () => {
    test('Should be able to update', async () => {
      const token = authTokenService.createAuthToken('87b96c89-5365-4cf0-a104-b28da006c2d7');
      const response = await fastify.inject({
        method: 'PATCH',
        url: '/user/v1/users/account',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        payload: {
          data: {
            firstName: 'Jane'
          }
        }
      });
      expect(response.statusCode).toBe(200);
    });
  });
});
