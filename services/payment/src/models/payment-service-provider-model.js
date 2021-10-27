'use strict';

const mongoose = require('mongoose');

const PaymentServiceProviderSchema = new mongoose.Schema({
  paymentServiceProviderId: {
    type: String,
    required: true,
    index: true,
    unique: true
  },
  paymentServiceProviderName: {
    type: String,
    required: true,
    index: true,
    unique: true,
    maxlength: 100,
    minlength: 1
  },
  apiVersion: {
    type: String,
    required: true,
    ['default']: '1.0.0'
  },
  paymentServiceProviderStatus: {
    type: String,
    required: true,
    ['enum']: ['ACTIVE', 'ACTIVE', 'DELETED'],
    ['default']: 'ACTIVE'
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

const PaymentServiceProviderModel = mongoose.model(
  'payment_service_provider',
  PaymentServiceProviderSchema
);

module.exports = { PaymentServiceProviderModel };
