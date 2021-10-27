'use strict';

const PaymentIntentMethodNotFoundError = require('../../../../src/errors/payment-intent-method-not-found-error');

describe('PaymentIntentMethodNotFoundError', () => {
  test('Should be able to create error', () => {
    const error = new PaymentIntentMethodNotFoundError({
      userId: '87b96c89-5365-4cf0-a104-b28da006c2d7',
      paymentIntentId: '97b96c89-5365-4cf0-a104-b28da006c2d7',
      paymentIntentMethodId: '97b96c89-5365-4cf0-a104-b28da006c2d7'
    });
    expect(error.statusCode).toBe(404);
    expect(error.message).toBe('Payment Intent Method not found');
    expect(error.name).toBe('PAYMENT_DOMAIN_PAYMENT_INTENT_METHOD_NOT_FOUND_ERROR');
    expect(error.errorData).toStrictEqual({
      userId: '87b96c89-5365-4cf0-a104-b28da006c2d7',
      paymentIntentId: '97b96c89-5365-4cf0-a104-b28da006c2d7',
      paymentIntentMethodId: '97b96c89-5365-4cf0-a104-b28da006c2d7'
    });
  });
});
