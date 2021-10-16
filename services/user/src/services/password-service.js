'use strict';

const bcrypt = require('bcrypt');
const { PASSWORD_SALT_ROUND } = require('../constants');

function hashPassword(password) {
  return bcrypt.hashSync(password, PASSWORD_SALT_ROUND);
}

module.exports = { hashPassword };
