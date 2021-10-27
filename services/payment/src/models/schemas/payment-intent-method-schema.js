'use strict';

const mongoose = require('mongoose');
const paymentIntentMethodStatusesSchema = require('./payment-intent-method-statuses-schema');

const paymentIntentMethodSchema = new mongoose.Schema({
  paymentIntentMethodId: {
    type: String,
    required: true
  },
  paymentServiceProvider: {
    type: Object,
    required: true,
    paymentServiceProviderId: {
      type: String,
      required: true
    },
    paymentServiceProviderName: {
      type: String,
      required: true
    }
  },
  paymentOption: {
    type: Object,
    required: true,
    paymentOptionId: {
      type: String,
      required: true
    },
    paymentOptionName: {
      type: String,
      required: true
    }
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
  capturedAmount: {
    type: Object,
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
  capturedAmountAt: {
    type: Date
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
  pspData: {
    type: Object
  },
  createdAt: {
    type: Date,
    ['default']: Date.now,
    required: true
  },
  updatedAt: {
    type: Date
  },
  status: {
    type: String,
    ['default']: 'CREATED'
  }
});

module.exports = paymentIntentMethodSchema;
