'use strict';

const mongoose = require('mongoose');
const {
  MONGODB_HOST,
  MONGODB_PORT,
  MONGODB_USERNAME,
  MONGODB_PASSWORD,
  MONGODB_DB_NAME
} = require('../constants');
const { PaymentServiceProviderModel } = require('../models/payment-service-provider-model');
const { PaymentOptionModel } = require('../models/payment-option-model');
const PaymentServiceProviderSeed = require('../../seeds/payment-service-provider');
const PaymentOptionSeed = require('../../seeds/payment-option');

async function upsert(data, model, filterField, seedFilename) {
  const bulkOps = data.map(record => ({
    updateOne: {
      filter: { [filterField]: record[filterField] },
      update: record,
      upsert: true
    }
  }));
  await model
    .bulkWrite(bulkOps)
    .then(result => console.info(`GENERATE SEEDS ${seedFilename} done.`, result))
    .catch(err => console.error(`GENERATE SEEDS ${seedFilename} ERROR:`, err));
}

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

    await Promise.all([
      upsert(
        PaymentServiceProviderSeed(),
        PaymentServiceProviderModel,
        'paymentServiceProviderId',
        'PaymentServiceProviders'
      ),
      upsert(PaymentOptionSeed(), PaymentOptionModel, 'paymentOptionId', 'PaymentOptions')
    ]);

    await mongoose.connection.close();
  } catch (err) {
    console.error('FATAL ERROR: Failed to connect to the MongoDB database.');
    console.error(err);
  }
}

generateSeed();
