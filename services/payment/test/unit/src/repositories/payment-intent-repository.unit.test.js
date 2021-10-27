'use strict';

const PaymentIntentRepository = require('../../../../src/repositories/payment-intent-repository');

describe('PaymentIntentRepository', () => {
  describe('fetchPaymentIntentById', () => {
    test('Should return payment intent', async () => {
      const PaymentIntentModel = {
        findOne: jest.fn(() => ({
          paymentIntentId: '87b96c89-5365-4cf0-a104-b28da006c2d7'
        }))
      };
      const paymentIntentRepository = new PaymentIntentRepository({
        PaymentIntentModel
      });
      const result = await paymentIntentRepository.fetchPaymentIntentById(
        '87b96c89-5365-4cf0-a104-b28da006c2d7'
      );
      expect(result).toStrictEqual({
        paymentIntentId: '87b96c89-5365-4cf0-a104-b28da006c2d7'
      });
    });
  });

  describe('createPaymentIntent', () => {
    test('Should create payment intent', async () => {
      const PaymentIntentModel = function () {
        return {
          save: jest.fn(() => {
            return { paymentIntentId: '87b96c89-5365-4cf0-a104-b28da006c2d7' };
          })
        };
      };
      const paymentIntentRepository = new PaymentIntentRepository({
        PaymentIntentModel
      });
      const result = await paymentIntentRepository.createPaymentIntent({
        userId: '07b96c89-5365-4cf0-a104-b28da006c2d7'
      });
      expect(result).toStrictEqual({
        paymentIntentId: '87b96c89-5365-4cf0-a104-b28da006c2d7'
      });
    });
  });

  describe('createPaymentIntentMethod', () => {
    test('Should return payment intent', async () => {
      const PaymentIntentModel = {
        updateOne: jest.fn(() => ({
          paymentIntentId: '87b96c89-5365-4cf0-a104-b28da006c2d7'
        }))
      };
      const paymentIntentRepository = new PaymentIntentRepository({
        PaymentIntentModel
      });
      const result = await paymentIntentRepository.createPaymentIntentMethod(
        '07b96c89-5365-4cf0-a104-b28da006c2d7',
        '87b96c89-5365-4cf0-a104-b28da006c2d7',
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
        paymentIntentId: '87b96c89-5365-4cf0-a104-b28da006c2d7'
      });
    });
  });
});
