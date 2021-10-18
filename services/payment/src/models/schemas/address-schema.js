'use strict';

const mongoose = require('mongoose');

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

module.exports = addressSchema;
