'use strict';

function PaymentServiceProviderSeed() {
  return [
    {
      paymentServiceProviderId: '86daccee-b5ea-428b-896a-74e0bb55ea4b',
      paymentServiceProviderName: 'STRIPE',
      updatedAt: Date.now()
    }
  ];
}

module.exports = PaymentServiceProviderSeed;
