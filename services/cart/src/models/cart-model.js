'use strict';

const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
  cartId: {
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
  cartItems: {
    type: Object,
    required: true
  },
  apiVersion: {
    type: String,
    required: true,
    ['default']: '1.0.0'
  },
  cartStatus: {
    type: String,
    required: true,
    ['enum']: ['ACTIVE', 'PROCESSED'],
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

const CartModel = mongoose.model('cart', CartSchema);

module.exports = { CartModel };
