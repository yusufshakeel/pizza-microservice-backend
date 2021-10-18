'use strict';

const mongoose = require('mongoose');
const paymentIntentMethodStatusesSchema = require('./payment-intent-method-statuses-schema');

const paymentIntentMethodSchema = new mongoose.Schema({
  paymentIntentMethodId: {
    type: String,
    required: true
  },
  paymentServiceProviderId: {
    type: String,
    required: true
  },
  paymentOptionId: {
    type: String,
    required: true
  },
  requestedAmount: {
    type: Object,
    required: true,
    centAmount: {
      type: 'Number',
      required: true
    },
    fraction: {
      type: 'Number',
      required: true
    },
    currency: {
      type: String,
      required: true
    }
  },
  apiVersion: {
    type: String,
    required: true,
    ['default']: '1.0.0'
  },
  statuses: {
    type: [paymentIntentMethodStatusesSchema],
    required: true
  },
  createdAt: {
    type: Date,
    ['default']: Date.now,
    required: true
  },
  updatedAt: {
    type: Date
  }
});

module.exports = paymentIntentMethodSchema;
