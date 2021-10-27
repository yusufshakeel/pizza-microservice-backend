'use strict';

const mongoose = require('mongoose');

const PaymentOptionSchema = new mongoose.Schema({
  paymentOptionId: {
    type: String,
    required: true,
    index: true,
    unique: true
  },
  paymentOptionName: {
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
  paymentOptionStatus: {
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

const PaymentOptionModel = mongoose.model('payment_option', PaymentOptionSchema);

module.exports = { PaymentOptionModel };
