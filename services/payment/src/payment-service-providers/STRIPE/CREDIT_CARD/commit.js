'use strict';

const stripeSetup = require('stripe')(process.env.STRIPE_PSP_SECRET_KEY);

async function Commit({ data, stripe = stripeSetup }) {
  const request = {
    amount: data.paymentIntentMethod.requestedAmount.centAmount,
    currency: data.paymentIntentMethod.requestedAmount.currency,
    payment_method_types: ['card'],
    description: 'Some description'
  };
  const response = await stripe.paymentIntents.create(request);
  return { pspResponse: { clientSecret: response.client_secret } };
}

module.exports = Commit;
