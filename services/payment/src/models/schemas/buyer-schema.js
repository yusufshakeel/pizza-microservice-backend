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

module.exports = buyerSchema;
