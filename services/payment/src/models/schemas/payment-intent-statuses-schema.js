'use strict';

const mongoose = require('mongoose');

const paymentIntentStatuses = new mongoose.Schema({
  status: {
    type: String,
    required: true,
    ['enum']: ['CREATED', 'CHARGED', 'REFUNDED', 'CANCELLED'],
    ['default']: 'CREATED'
  },
  eventTime: {
    type: Date,
    ['default']: Date.now,
    required: true
  }
});

module.exports = paymentIntentStatuses;
