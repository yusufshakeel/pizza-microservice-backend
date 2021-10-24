'use strict';

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    index: true,
    unique: true
  },
  firstName: {
    type: String,
    maxlength: 255,
    minlength: 1,
    required: true
  },
  lastName: {
    type: String,
    maxlength: 255,
    minlength: 1
  },
  emailAddress: {
    type: String,
    maxlength: 255,
    minlength: 8,
    required: true,
    unique: true
  },
  password: {
    type: String,
    maxlength: 1024,
    minlength: 1,
    required: true
  },
  contactPhone: {
    type: Object,
    required: true,
    unique: true,
    countryCode: {
      type: String,
      required: true
    },
    phoneNumber: {
      type: String,
      required: true
    }
  },
  address: {
    type: Object,
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
  },
  apiVersion: {
    type: String,
    required: true,
    ['default']: '1.0.0'
  },
  accountStatus: {
    type: String,
    required: true,
    ['enum']: ['ACTIVE', 'INACTIVE'],
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

const UserModel = mongoose.model('user', UserSchema);

module.exports = { UserModel };
