'use strict';

const mongoose = require('mongoose');

const paymentIntentMethodStatuses = new mongoose.Schema({
  status: {
    type: String,
    required: true,
    ['enum']: ['CREATED', 'COMMITTED', 'AUTHORIZED', 'CHARGED', 'REFUNDED'],
    ['default']: 'CREATED'
  },
  eventTime: {
    type: Date,
    ['default']: Date.now,
    required: true
  }
});

module.exports = paymentIntentMethodStatuses;
