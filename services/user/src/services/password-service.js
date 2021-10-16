'use strict';

const bcrypt = require('bcrypt');
const { PASSWORD_SALT_ROUND } = require('../constants');

function hashPassword(plainTextPassword) {
  return bcrypt.hashSync(plainTextPassword, PASSWORD_SALT_ROUND);
}

function verifyPassword(plainTestPassword, hashedPassword) {
  return bcrypt.compareSync(plainTestPassword, hashedPassword);
}

module.exports = { hashPassword, verifyPassword };
