'use strict';

const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true,
    index: true,
    unique: true
  },
  productName: {
    type: String,
    required: true,
    maxlength: 200,
    minlength: 3
  },
  productDescription: {
    type: String,
    required: true,
    maxlength: 500
  },
  productGroup: {
    type: String,
    required: true,
    ['enum']: ['VEG', 'NON VEG']
  },
  productCategory: {
    type: String,
    required: true,
    ['enum']: ['PIZZA', 'SIDES', 'BEVERAGES', 'DESSERTS']
  },
  price: {
    type: Object,
    centAmount: {
      type: Number,
      required: true,
      min: 0
    },
    fraction: {
      type: Number,
      required: true,
      min: 1
    },
    currency: {
      type: String,
      required: true,
      minlength: 3
    }
  },
  productStatus: {
    type: String,
    required: true,
    ['enum']: ['ACTIVE', 'INACTIVE'],
    ['default']: 'ACTIVE'
  },
  apiVersion: {
    type: String,
    required: true,
    ['default']: '1.0.0'
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

const ProductModel = mongoose.model('product', ProductSchema);

module.exports = { ProductModel };
