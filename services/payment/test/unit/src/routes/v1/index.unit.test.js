'use strict';

const fastify = require('fastify')();
const jwt = require('jsonwebtoken');
const $RefParser = require('json-schema-ref-parser');
const routes = require('../../../../../src/routes/v1/index');
const Controller = require('../../../../../src/controllers');
const SchemaRepository = require('../../../../../src/repositories/schema-repository');
const { JWT_SECRET } = require('../../../../../src/constants');

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

const repositories = {
  paymentServiceProviderRepository: {
    fetchPaymentServiceProviderById: jest.fn(() => {
      return {
        paymentServiceProviderId: '07b96c89-5365-4cf0-a104-b28da006c2d7',
        paymentServiceProviderName: 'Some Name'
      };
    }),
    fetchAllPaymentServiceProvider: jest.fn(() => {
      return [
        {
          paymentServiceProviderId: '07b96c89-5365-4cf0-a104-b28da006c2d7',
          paymentServiceProviderName: 'Some Name'
        }
      ];
    })
  },
  paymentOptionRepository: {
    fetchPaymentOptionById: jest.fn(() => {
      return {
        paymentOptionId: '07b96c89-5365-4cf0-a104-b28da006c2d7',
        paymentOptionName: 'Some Name'
      };
    }),
    fetchAllPaymentOption: jest.fn(() => {
      return [
        {
          paymentOptionId: '07b96c89-5365-4cf0-a104-b28da006c2d7',
          paymentOptionName: 'Some Name'
        }
      ];
    })
  },
  paymentIntentRepository: {
    createPaymentIntent: jest.fn(() => {
      return { paymentIntentId: '01b96c89-5365-4cf0-a104-b28da006c2d7' };
    }),
    fetchPaymentIntentById: jest.fn(() => {
      return {
        cartId: '01b96c89-5365-4cf0-a104-b28da006c2d7',
        userId: '87b96c89-5365-4cf0-a104-b28da006c2d7',
        paymentIntentId: '01b96c89-5365-4cf0-a104-b28da006c2d7',
        paymentIntentMethods: []
      };
    }),
    createPaymentIntentMethod: jest.fn(() => {
      return {};
    })
  }
};

beforeAll(async () => {
  const schemaRepository = await new SchemaRepository(new $RefParser()).loadAll();
  const controller = new Controller({ repositories });
  await routes(fastify, { controller, schemaRepository });
});

describe('Routes /v1/payments', () => {
  describe('Fetch payment service provider by id', () => {
    test('Should return result', async () => {
      const token = validToken('87b96c89-5365-4cf0-a104-b28da006c2d7');
      const response = await fastify.inject({
        method: 'GET',
        url: '/payment/v1/payments/payment-service-providers/07b96c89-5365-4cf0-a104-b28da006c2d7',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });
      expect(response.statusCode).toBe(200);
    });
  });

  describe('Fetch all payment service providers', () => {
    test('Should return result', async () => {
      const token = validToken('87b96c89-5365-4cf0-a104-b28da006c2d7');
      const response = await fastify.inject({
        method: 'GET',
        url: '/payment/v1/payments/payment-service-providers',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });
      expect(response.statusCode).toBe(200);
    });
  });

  describe('Fetch payment option by id', () => {
    test('Should return result', async () => {
      const token = validToken('87b96c89-5365-4cf0-a104-b28da006c2d7');
      const response = await fastify.inject({
        method: 'GET',
        url: '/payment/v1/payments/payment-options/07b96c89-5365-4cf0-a104-b28da006c2d7',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });
      expect(response.statusCode).toBe(200);
    });
  });

  describe('Fetch all payment options', () => {
    test('Should return result', async () => {
      const token = validToken('87b96c89-5365-4cf0-a104-b28da006c2d7');
      const response = await fastify.inject({
        method: 'GET',
        url: '/payment/v1/payments/payment-options',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });
      expect(response.statusCode).toBe(200);
    });
  });

  describe('Create payment intent', () => {
    test('Should return result', async () => {
      const token = validToken('87b96c89-5365-4cf0-a104-b28da006c2d7');
      const response = await fastify.inject({
        method: 'POST',
        url: '/payment/v1/payments/payment-intents',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        payload: {
          data: {
            cartId: '00b96c89-5365-4cf0-a104-b28da006c2d7',
            buyer: {
              firstName: 'John',
              lastName: 'Doe'
            },
            contactPhone: {
              countryCode: '91',
              phoneNumber: '9800098000'
            },
            shippingAddress: {
              line1: 'Address line 1',
              line2: 'Address line 2',
              line3: 'Address line 3',
              city: 'Bangalore',
              state: 'KA',
              country: 'IND',
              postcode: '560001'
            },
            order: [
              {
                productId: 'p-1',
                productName: 'Paneer Pizza',
                productCustomInfo: [
                  {
                    group: 'SIZE',
                    items: [
                      {
                        id: 'SMALL - serve 1',
                        adjustment: {
                          multiplier: 1,
                          amount: {
                            centAmount: 0,
                            fraction: 100,
                            currency: 'INR'
                          }
                        }
                      }
                    ]
                  },
                  {
                    group: 'CRUST',
                    items: [
                      {
                        id: 'Hand tossed',
                        adjustment: {
                          multiplier: 1,
                          amount: {
                            centAmount: 1000,
                            fraction: 100,
                            currency: 'INR'
                          }
                        }
                      }
                    ]
                  }
                ],
                productGroup: 'VEG',
                productCategory: 'PIZZA',
                unitPrice: {
                  centAmount: 20000,
                  currency: 'INR',
                  fraction: 100
                },
                quantity: {
                  quantityNumber: 1,
                  quantityUnit: 'unit'
                }
              }
            ],
            bill: [
              {
                group: 'PRODUCTS',
                productId: 'p-1',
                adjustment: {
                  multiplier: 1,
                  amount: {
                    centAmount: 21000,
                    currency: 'INR',
                    fraction: 100
                  }
                }
              }
            ]
          }
        }
      });
      expect(response.statusCode).toBe(201);
      expect(JSON.parse(response.payload)).toStrictEqual({
        data: {
          paymentIntentId: '01b96c89-5365-4cf0-a104-b28da006c2d7'
        }
      });
    });
  });

  describe('Fetch payment intent by id', () => {
    test('Should return result', async () => {
      const token = validToken('87b96c89-5365-4cf0-a104-b28da006c2d7');
      const response = await fastify.inject({
        method: 'GET',
        url: '/payment/v1/payments/payment-intents/01b96c89-5365-4cf0-a104-b28da006c2d7',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });
      expect(response.statusCode).toBe(200);
    });
  });

  describe('Create payment intent method', () => {
    test('Should return result', async () => {
      const token = validToken('87b96c89-5365-4cf0-a104-b28da006c2d7');
      const response = await fastify.inject({
        method: 'POST',
        url: '/payment/v1/payments/payment-intents/01b96c89-5365-4cf0-a104-b28da006c2d7/payment-intent-methods',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        payload: {
          data: {
            paymentServiceProviderId: '86daccee-b5ea-428b-896a-74e0bb55ea4b',
            paymentOptionId: '600be2d4-128f-424e-9850-9f215d614eb8',
            requestedAmount: {
              centAmount: 44840,
              currency: 'INR',
              fraction: 100
            }
          }
        }
      });
      expect(response.statusCode).toBe(201);
    });
  });
});
