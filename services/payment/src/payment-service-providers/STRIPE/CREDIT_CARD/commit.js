'use strict';

const stripeSetup = require('stripe')(process.env.STRIPE_PSP_SECRET_KEY);

async function Commit({ data, stripe = stripeSetup }) {
  const request = {
    amount: data.paymentIntentMethod.requestedAmount.centAmount,
    currency: data.paymentIntentMethod.requestedAmount.currency,
    payment_method_types: ['card'],
    description: 'PizzaPizza - Payments - Testing...',
    metadata: {
      domain: 'PizzaPizza - Payments - Testing...',
      paymentIntentId: data.paymentIntent.paymentIntentId
    }
  };
  const response = await stripe.paymentIntents.create(request);
  const toSave = {
    providerId: response.id,
    paymentMethod: response.payment_method,
    status: response.status,
    clientSecret: response.client_secret
  };
  return { pspResponse: { clientSecret: response.client_secret }, toSave };
}

module.exports = Commit;
