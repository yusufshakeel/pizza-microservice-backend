'use strict';

const mongoose = require('mongoose');

const buyerSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    maxlength: 100,
    minlength: 1
  },
  lastName: {
    type: String,
    required: true,
    maxlength: 100,
    minlength: 1
  }
});

const contactPhoneSchema = new mongoose.Schema({
  countryCode: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  }
});

const addressSchema = new mongoose.Schema({
  line1: {
    type: String,
    maxlength: 100,
    minlength: 1,
    required: true
  },
  line2: {
    type: String,
    maxlength: 100,
    minlength: 1
  },
  line3: {
    type: String,
    maxlength: 100,
    minlength: 1
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  postcode: {
    type: String,
    required: true
  }
});

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
  paymentIntentStatus: {
    type: String,
    required: true,
    ['enum']: ['CREATED', 'CHARGED', 'REFUNDED', 'CANCELLED'],
    ['default']: 'CREATED'
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

const PaymentIntentModel = mongoose.model('payment_intent', PaymentIntentSchema);

module.exports = { PaymentIntentModel };
