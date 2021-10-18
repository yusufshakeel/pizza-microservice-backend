'use strict';

const DatabaseAccessError = require('../errors/database-access-error');

function RepositoryError() {
  return function (repositoryOperator) {
    return async function (...parameters) {
      const callerStack = new Error().stack;
      try {
        const startTime = process.hrtime.bigint();
        const result = await repositoryOperator(...parameters);
        const endTime = process.hrtime.bigint();
        const duration = endTime - startTime;
        console.info('Database operation', {
          duration: Number(duration),
          unit: 'nanoseconds'
        });
        return result;
      } catch (err) {
        const databaseError = new DatabaseAccessError({ innerError: err });
        console.error('RepositoryError error in database operation', err, callerStack);
        throw databaseError;
      }
    };
  };
}

module.exports = RepositoryError;
