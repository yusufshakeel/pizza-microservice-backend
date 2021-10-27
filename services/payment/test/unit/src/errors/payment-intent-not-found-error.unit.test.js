'use strict';

const PaymentIntentNotFoundError = require('../../../../src/errors/payment-intent-not-found-error');

describe('PaymentIntentNotFoundError', () => {
  test('Should be able to create error', () => {
    const error = new PaymentIntentNotFoundError(
      '87b96c89-5365-4cf0-a104-b28da006c2d7',
      '97b96c89-5365-4cf0-a104-b28da006c2d7'
    );
    expect(error.statusCode).toBe(404);
    expect(error.message).toBe('Payment Intent not found');
    expect(error.name).toBe('PAYMENT_DOMAIN_PAYMENT_INTENT_NOT_FOUND_ERROR');
    expect(error.errorData).toStrictEqual({
      userId: '87b96c89-5365-4cf0-a104-b28da006c2d7',
      paymentIntentId: '97b96c89-5365-4cf0-a104-b28da006c2d7'
    });
  });
});
