'use strict';

const PaymentServiceProviderRepository = require('../../../../src/repositories/payment-service-provider-repository');

describe('PaymentServiceProviderRepository', () => {
  describe('fetchPaymentServiceProviderById', () => {
    test('Should return payment service provider', async () => {
      const PaymentServiceProviderModel = {
        findOne: jest.fn(() => ({
          paymentServiceProviderId: '87b96c89-5365-4cf0-a104-b28da006c2d7'
        }))
      };
      const paymentServiceProviderRepository = new PaymentServiceProviderRepository({
        PaymentServiceProviderModel
      });
      const result = await paymentServiceProviderRepository.fetchPaymentServiceProviderById(
        '87b96c89-5365-4cf0-a104-b28da006c2d7'
      );
      expect(result).toStrictEqual({
        paymentServiceProviderId: '87b96c89-5365-4cf0-a104-b28da006c2d7'
      });
    });
  });

  describe('fetchAllPaymentServiceProvider', () => {
    test('Should return all payment service providers', async () => {
      const PaymentServiceProviderModel = {
        find: jest.fn(() => [{ paymentServiceProviderId: '87b96c89-5365-4cf0-a104-b28da006c2d7' }])
      };
      const paymentServiceProviderRepository = new PaymentServiceProviderRepository({
        PaymentServiceProviderModel
      });
      const result = await paymentServiceProviderRepository.fetchAllPaymentServiceProvider();
      expect(result).toStrictEqual([
        { paymentServiceProviderId: '87b96c89-5365-4cf0-a104-b28da006c2d7' }
      ]);
    });
  });
});
