'use strict';

const Controller = require('../../../../src/controllers');
const PaymentServiceProviderNotFoundError = require('../../../../src/errors/payment-service-provider-not-found-error');
const PaymentOptionNotFoundError = require('../../../../src/errors/payment-option-not-found-error');
const PaymentIntentNotFoundError = require('../../../../src/errors/payment-intent-not-found-error');

describe('Testing controller', () => {
  describe('fetchPaymentServiceProviderById', () => {
    describe('When records are present', () => {
      test('Should return result', async () => {
        const repositories = {
          paymentServiceProviderRepository: {
            fetchPaymentServiceProviderById: jest.fn(() => {
              return { paymentServiceProviderId: 'fb41d4fc-3a08-4a10-ac27-3de3ba77c9e3' };
            })
          }
        };
        const controller = new Controller({ repositories });
        const result = await controller.fetchPaymentServiceProviderById(
          'fb41d4fc-3a08-4a10-ac27-3de3ba77c9e3'
        );
        expect(result).toStrictEqual({
          data: {
            paymentServiceProviderId: 'fb41d4fc-3a08-4a10-ac27-3de3ba77c9e3'
          }
        });
      });
    });

    describe('When records are absent', () => {
      test('Should throw error', async () => {
        const repositories = {
          paymentServiceProviderRepository: {
            fetchPaymentServiceProviderById: jest.fn()
          }
        };
        const controller = new Controller({ repositories });
        await expect(
          controller.fetchPaymentServiceProviderById('fb41d4fc-3a08-4a10-ac27-3de3ba77c9e3')
        ).rejects.toThrow(
          new PaymentServiceProviderNotFoundError('fb41d4fc-3a08-4a10-ac27-3de3ba77c9e3')
        );
      });
    });
  });

  describe('fetchAllPaymentServiceProvider', () => {
    describe('When records are present', () => {
      test('Should return result', async () => {
        const repositories = {
          paymentServiceProviderRepository: {
            fetchAllPaymentServiceProvider: jest.fn(() => {
              return [{ paymentServiceProviderId: 'fb41d4fc-3a08-4a10-ac27-3de3ba77c9e3' }];
            })
          }
        };
        const controller = new Controller({ repositories });
        const result = await controller.fetchAllPaymentServiceProvider();
        expect(result).toStrictEqual({
          data: {
            paymentServiceProviders: [
              { paymentServiceProviderId: 'fb41d4fc-3a08-4a10-ac27-3de3ba77c9e3' }
            ]
          }
        });
      });
    });

    describe('When records are absent', () => {
      test('Should throw error', async () => {
        const repositories = {
          paymentServiceProviderRepository: {
            fetchAllPaymentServiceProvider: jest.fn()
          }
        };
        const controller = new Controller({ repositories });
        await expect(controller.fetchAllPaymentServiceProvider()).rejects.toThrow(
          new PaymentServiceProviderNotFoundError()
        );
      });
    });
  });

  describe('fetchPaymentOptionById', () => {
    describe('When records are present', () => {
      test('Should return result', async () => {
        const repositories = {
          paymentOptionRepository: {
            fetchPaymentOptionById: jest.fn(() => {
              return { paymentOptionId: 'fb41d4fc-3a08-4a10-ac27-3de3ba77c9e3' };
            })
          }
        };
        const controller = new Controller({ repositories });
        const result = await controller.fetchPaymentOptionById(
          'fb41d4fc-3a08-4a10-ac27-3de3ba77c9e3'
        );
        expect(result).toStrictEqual({
          data: { paymentOptionId: 'fb41d4fc-3a08-4a10-ac27-3de3ba77c9e3' }
        });
      });
    });

    describe('When records are absent', () => {
      test('Should throw error', async () => {
        const repositories = {
          paymentOptionRepository: {
            fetchPaymentOptionById: jest.fn()
          }
        };
        const controller = new Controller({ repositories });
        await expect(controller.fetchPaymentOptionById()).rejects.toThrow(
          new PaymentOptionNotFoundError('fb41d4fc-3a08-4a10-ac27-3de3ba77c9e3')
        );
      });
    });
  });

  describe('fetchAllPaymentOption', () => {
    describe('When records are present', () => {
      test('Should return result', async () => {
        const repositories = {
          paymentOptionRepository: {
            fetchAllPaymentOption: jest.fn(() => {
              return [{ paymentOptionId: 'fb41d4fc-3a08-4a10-ac27-3de3ba77c9e3' }];
            })
          }
        };
        const controller = new Controller({ repositories });
        const result = await controller.fetchAllPaymentOption();
        expect(result).toStrictEqual({
          data: {
            paymentOptions: [{ paymentOptionId: 'fb41d4fc-3a08-4a10-ac27-3de3ba77c9e3' }]
          }
        });
      });
    });

    describe('When records are absent', () => {
      test('Should throw error', async () => {
        const repositories = {
          paymentOptionRepository: {
            fetchAllPaymentOption: jest.fn()
          }
        };
        const controller = new Controller({ repositories });
        await expect(controller.fetchAllPaymentOption()).rejects.toThrow(
          new PaymentOptionNotFoundError()
        );
      });
    });
  });

  describe('createPaymentIntent', () => {
    test('Should return result', async () => {
      const repositories = {
        paymentIntentRepository: {
          createPaymentIntent: jest.fn(() => {
            return { paymentIntentId: 'fb41d4fc-3a08-4a10-ac27-3de3ba77c9e3' };
          })
        }
      };
      const controller = new Controller({ repositories });
      const result = await controller.createPaymentIntent();
      expect(result).toStrictEqual({
        data: {
          paymentIntentId: 'fb41d4fc-3a08-4a10-ac27-3de3ba77c9e3'
        }
      });
    });
  });

  describe('fetchPaymentIntentById', () => {
    describe('When records are present', () => {
      test('Should return result', async () => {
        const repositories = {
          paymentIntentRepository: {
            fetchPaymentIntentById: jest.fn(() => {
              return { paymentIntentId: 'fb41d4fc-3a08-4a10-ac27-3de3ba77c9e3' };
            })
          }
        };
        const controller = new Controller({ repositories });
        const result = await controller.fetchPaymentIntentById(
          'fb41d4fc-3a08-4a10-ac27-3de3ba77c9e3'
        );
        expect(result).toStrictEqual({
          data: {
            paymentIntentId: 'fb41d4fc-3a08-4a10-ac27-3de3ba77c9e3'
          }
        });
      });
    });

    describe('When records are absent', () => {
      test('Should throw error', async () => {
        const repositories = {
          paymentIntentRepository: {
            fetchPaymentIntentById: jest.fn()
          }
        };
        const controller = new Controller({ repositories });
        await expect(
          controller.fetchPaymentIntentById('fb41d4fc-3a08-4a10-ac27-3de3ba77c9e3')
        ).rejects.toThrow(
          new PaymentIntentNotFoundError(
            '1b41d4fc-3a08-4a10-ac27-3de3ba77c9e3',
            'fb41d4fc-3a08-4a10-ac27-3de3ba77c9e3'
          )
        );
      });
    });
  });

  describe('createPaymentIntentMethod', () => {
    describe('When there is no issue with the data', () => {
      test('Should return result', async () => {
        const repositories = {
          paymentServiceProviderRepository: {
            fetchPaymentServiceProviderById: jest.fn(() => {
              return {};
            })
          },
          paymentOptionRepository: {
            fetchPaymentOptionById: jest.fn(() => {
              return {};
            })
          },
          paymentIntentRepository: {
            fetchPaymentIntentById: jest.fn(() => {
              return {};
            }),
            createPaymentIntentMethod: jest.fn(() => {
              return { paymentIntentId: 'fb41d4fc-3a08-4a10-ac27-3de3ba77c9e3' };
            })
          }
        };
        const controller = new Controller({ repositories });
        const result = await controller.createPaymentIntentMethod(
          'fb41d4fc-3a08-4a10-ac27-3de3ba77c9e3',
          '1b41d4fc-3a08-4a10-ac27-3de3ba77c9e3',
          {
            paymentServiceProviderId: '86daccee-b5ea-428b-896a-74e0bb55ea4b',
            paymentOptionId: '600be2d4-128f-424e-9850-9f215d614eb8',
            requestedAmount: {
              centAmount: 44840,
              currency: 'INR',
              fraction: 100
            }
          }
        );
        expect(result).toStrictEqual({
          data: {
            paymentIntentId: '1b41d4fc-3a08-4a10-ac27-3de3ba77c9e3',
            paymentIntentMethodId: expect.any(String),
            userId: 'fb41d4fc-3a08-4a10-ac27-3de3ba77c9e3'
          }
        });
      });
    });

    describe('When there some issue with the data', () => {
      describe('When payment service provider is not present', () => {
        test('Should throw error', async () => {
          const repositories = {
            paymentServiceProviderRepository: {
              fetchPaymentServiceProviderById: jest.fn()
            },
            paymentOptionRepository: {
              fetchPaymentOptionById: jest.fn(() => {
                return {};
              })
            },
            paymentIntentRepository: {
              fetchPaymentIntentById: jest.fn(() => {
                return {};
              }),
              createPaymentIntentMethod: jest.fn(() => {
                return { paymentIntentId: 'fb41d4fc-3a08-4a10-ac27-3de3ba77c9e3' };
              })
            }
          };
          const controller = new Controller({ repositories });
          await expect(
            controller.createPaymentIntentMethod(
              'fb41d4fc-3a08-4a10-ac27-3de3ba77c9e3',
              '1b41d4fc-3a08-4a10-ac27-3de3ba77c9e3',
              {
                paymentServiceProviderId: '86daccee-b5ea-428b-896a-74e0bb55ea4b',
                paymentOptionId: '600be2d4-128f-424e-9850-9f215d614eb8',
                requestedAmount: {
                  centAmount: 44840,
                  currency: 'INR',
                  fraction: 100
                }
              }
            )
          ).rejects.toThrow(
            new PaymentServiceProviderNotFoundError('86daccee-b5ea-428b-896a-74e0bb55ea4b')
          );
        });
      });

      describe('When payment option is not present', () => {
        test('Should throw error', async () => {
          const repositories = {
            paymentServiceProviderRepository: {
              fetchPaymentServiceProviderById: jest.fn(() => {
                return {};
              })
            },
            paymentOptionRepository: {
              fetchPaymentOptionById: jest.fn()
            },
            paymentIntentRepository: {
              fetchPaymentIntentById: jest.fn(() => {
                return {};
              }),
              createPaymentIntentMethod: jest.fn(() => {
                return { paymentIntentId: 'fb41d4fc-3a08-4a10-ac27-3de3ba77c9e3' };
              })
            }
          };
          const controller = new Controller({ repositories });
          await expect(
            controller.createPaymentIntentMethod(
              'fb41d4fc-3a08-4a10-ac27-3de3ba77c9e3',
              '1b41d4fc-3a08-4a10-ac27-3de3ba77c9e3',
              {
                paymentServiceProviderId: '86daccee-b5ea-428b-896a-74e0bb55ea4b',
                paymentOptionId: '600be2d4-128f-424e-9850-9f215d614eb8',
                requestedAmount: {
                  centAmount: 44840,
                  currency: 'INR',
                  fraction: 100
                }
              }
            )
          ).rejects.toThrow(new PaymentOptionNotFoundError('600be2d4-128f-424e-9850-9f215d614eb8'));
        });
      });

      describe('When payment intent is not present', () => {
        test('Should throw error', async () => {
          const repositories = {
            paymentServiceProviderRepository: {
              fetchPaymentServiceProviderById: jest.fn(() => {
                return {};
              })
            },
            paymentOptionRepository: {
              fetchPaymentOptionById: jest.fn(() => {
                return {};
              })
            },
            paymentIntentRepository: {
              fetchPaymentIntentById: jest.fn(),
              createPaymentIntentMethod: jest.fn(() => {
                return { paymentIntentId: 'fb41d4fc-3a08-4a10-ac27-3de3ba77c9e3' };
              })
            }
          };
          const controller = new Controller({ repositories });
          await expect(
            controller.createPaymentIntentMethod(
              'fb41d4fc-3a08-4a10-ac27-3de3ba77c9e3',
              '1b41d4fc-3a08-4a10-ac27-3de3ba77c9e3',
              {
                paymentServiceProviderId: '86daccee-b5ea-428b-896a-74e0bb55ea4b',
                paymentOptionId: '600be2d4-128f-424e-9850-9f215d614eb8',
                requestedAmount: {
                  centAmount: 44840,
                  currency: 'INR',
                  fraction: 100
                }
              }
            )
          ).rejects.toThrow(
            new PaymentIntentNotFoundError(
              '100be2d4-128f-424e-9850-9f215d614eb8',
              '200be2d4-128f-424e-9850-9f215d614eb8'
            )
          );
        });
      });
    });
  });
});
