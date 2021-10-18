'use strict';

const mongoose = require('mongoose');
const paymentIntentStatusesSchema = require('./schemas/payment-intent-statuses-schema');
const paymentIntentMethodSchema = require('./schemas/payment-intent-method-schema');
const buyerSchema = require('./schemas/buyer-schema');
const contactPhoneSchema = require('./schemas/contact-phone-schema');
const addressSchema = require('./schemas/address-schema');

const PaymentIntentSchema = new mongoose.Schema({
  paymentIntentId: {
    type: String,
    required: true,
    index: true,
    unique: true
  },
  userId: {
    type: String,
    required: true,
    index: true
  },
  cartId: {
    type: String,
    required: true,
    index: true
  },
  buyer: {
    type: buyerSchema,
    required: true
  },
  contactPhone: {
    type: contactPhoneSchema,
    required: true
  },
  shippingAddress: {
    type: addressSchema,
    required: true
  },
  order: {
    type: Object,
    required: true
  },
  bill: {
    type: Object,
    required: true
  },
  apiVersion: {
    type: String,
    required: true,
    ['default']: '1.0.0'
  },
  statuses: {
    type: [paymentIntentStatusesSchema],
    required: true
  },
  createdAt: {
    type: Date,
    ['default']: Date.now,
    required: true
  },
  updatedAt: {
    type: Date
  },
  paymentIntentMethods: {
    type: [paymentIntentMethodSchema]
  }
});

const PaymentIntentModel = mongoose.model('payment_intent', PaymentIntentSchema);

module.exports = { PaymentIntentModel };
