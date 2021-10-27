'use strict';

const PaymentOptionNotFoundError = require('../../../../src/errors/payment-option-not-found-error');

describe('PaymentOptionNotFoundError', () => {
  test('Should be able to create error', () => {
    const error = new PaymentOptionNotFoundError('87b96c89-5365-4cf0-a104-b28da006c2d7');
    expect(error.statusCode).toBe(404);
    expect(error.message).toBe('Payment Option not found');
    expect(error.name).toBe('PAYMENT_DOMAIN_PAYMENT_OPTION_NOT_FOUND_ERROR');
    expect(error.errorData).toStrictEqual({
      paymentOptionId: '87b96c89-5365-4cf0-a104-b28da006c2d7'
    });
  });
});
