'use strict';

const PaymentServiceProviderNotFoundError = require('../../../../src/errors/payment-service-provider-not-found-error');

describe('PaymentServiceProviderNotFoundError', () => {
  test('Should be able to create error', () => {
    const error = new PaymentServiceProviderNotFoundError('87b96c89-5365-4cf0-a104-b28da006c2d7');
    expect(error.statusCode).toBe(404);
    expect(error.message).toBe('Payment Service Provider not found');
    expect(error.name).toBe('PAYMENT_DOMAIN_PAYMENT_SERVICE_PROVIDER_NOT_FOUND_ERROR');
    expect(error.errorData).toStrictEqual({
      paymentServiceProviderId: '87b96c89-5365-4cf0-a104-b28da006c2d7'
    });
  });
});
