'use strict';

const mongoose = require('mongoose');

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

module.exports = contactPhoneSchema;
