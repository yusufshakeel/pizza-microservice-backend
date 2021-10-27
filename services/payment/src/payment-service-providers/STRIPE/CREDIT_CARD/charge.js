"use strict";

const stripeSetup = require("stripe")(process.env.STRIPE_PSP_SECRET_KEY);
const StripePspError = require("../../../errors/stripe-psp-error");

async function Charge({ data, stripe = stripeSetup }) {
  console.info("charge\n\n\n", JSON.stringify(data), "\n\n\n");
  const stripePaymentIntentId = data.paymentIntentMethod.pspData.providerId;
  const response = await stripe.paymentIntents.retrieve(stripePaymentIntentId);
  console.info("charge\n\n\n", JSON.stringify(response), "\n\n\n");
  if (response.status !== "succeeded") {
    throw new StripePspError({
      userId: data.paymentIntent.userId,
      paymentIntentId: data.paymentIntent.paymentIntentId,
      paymentIntentMethodId: data.paymentIntentMethod.paymentIntentMethodId,
      pspError: {
        id: response.id,
        status: response.status,
        created: response.created
      }
    });
  }
  const toSave = {
    providerId: response.id,
    paymentMethod: response.payment_method,
    status: response.status,
    capturedAmount: {
      centAmount: response.charges.data[0].amount_captured,
      fraction: data.paymentIntentMethod.requestedAmount.fraction,
      currency: data.paymentIntentMethod.requestedAmount.currency
    },
    capturedAmountAt: new Date(response.created * 1000)
  };
  return { pspResponse: { clientSecret: response.client_secret }, toSave };
}

module.exports = Charge;
