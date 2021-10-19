'use strict';

function PaymentOptionSeed() {
  return [
    {
      paymentOptionId: '600be2d4-128f-424e-9850-9f215d614eb8',
      paymentOptionName: 'CREDIT_CARD',
      updatedAt: Date.now()
    },
    {
      paymentOptionId: '700be2d4-128f-424e-9850-9f215d614eb8',
      paymentOptionName: 'DEBIT_CARD',
      updatedAt: Date.now()
    }
  ];
}

module.exports = PaymentOptionSeed;
