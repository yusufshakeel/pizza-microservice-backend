'use strict';

const mongoose = require('mongoose');
const {
  MONGODB_HOST,
  MONGODB_PORT,
  MONGODB_USERNAME,
  MONGODB_PASSWORD,
  MONGODB_DB_NAME
} = require('../constants');
const { ProductModel } = require('../models/product-model');
const ProductsSeed = require('../../seeds/products');

async function generateSeed() {
  const mongoOption = { dbName: MONGODB_DB_NAME };
  const mongoAuth =
    MONGODB_USERNAME.length && MONGODB_PASSWORD.length
      ? `${MONGODB_USERNAME}:${MONGODB_PASSWORD}@`
      : '';
  const mongoUrl = `mongodb://${mongoAuth}${MONGODB_HOST}:${MONGODB_PORT}`;
  try {
    await mongoose.connect(mongoUrl, mongoOption);
    console.info('Connected to MongoDB database.');

    const bulkOps = ProductsSeed().map(product => ({
      updateOne: {
        filter: { productId: product.productId },
        update: product,
        upsert: true
      }
    }));

    await ProductModel.bulkWrite(bulkOps)
      .then(result => console.info('GENERATE SEEDS products done.', result))
      .catch(err => console.error('GENERATE SEEDS products ERROR:', err));

    await mongoose.connection.close();
  } catch (err) {
    console.error('FATAL ERROR: Failed to connect to the MongoDB database.');
    console.error(err);
  }
}

generateSeed();
