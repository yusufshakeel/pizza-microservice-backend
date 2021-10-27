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
  console.info('commit\n\n\n', JSON.stringify(response), '\n\n\n');
  const toSave = {
    providerId: response.id,
    paymentMethod: response.payment_method,
    status: response.status
  };
  return { pspResponse: { clientSecret: response.client_secret }, toSave };
}

module.exports = Commit;
