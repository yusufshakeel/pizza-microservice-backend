'use strict';

const PaymentOptionRepository = require('../../../../src/repositories/payment-option-repository');

describe('PaymentOptionRepository', () => {
  describe('fetchPaymentOptionById', () => {
    test('Should return payment option', async () => {
      const PaymentOptionModel = {
        findOne: jest.fn(() => ({
          paymentOptionId: '87b96c89-5365-4cf0-a104-b28da006c2d7'
        }))
      };
      const paymentOptionRepository = new PaymentOptionRepository({
        PaymentOptionModel
      });
      const result = await paymentOptionRepository.fetchPaymentOptionById(
        '87b96c89-5365-4cf0-a104-b28da006c2d7'
      );
      expect(result).toStrictEqual({
        paymentOptionId: '87b96c89-5365-4cf0-a104-b28da006c2d7'
      });
    });
  });

  describe('fetchAllPaymentOption', () => {
    test('Should return all payment option', async () => {
      const PaymentOptionModel = {
        find: jest.fn(() => [
          {
            paymentOptionId: '87b96c89-5365-4cf0-a104-b28da006c2d7'
          }
        ])
      };
      const paymentOptionRepository = new PaymentOptionRepository({
        PaymentOptionModel
      });
      const result = await paymentOptionRepository.fetchAllPaymentOption();
      expect(result).toStrictEqual([
        {
          paymentOptionId: '87b96c89-5365-4cf0-a104-b28da006c2d7'
        }
      ]);
    });
  });
});
