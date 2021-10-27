'use strict';

const bcrypt = require('bcrypt');
const { PASSWORD_SALT_ROUND } = require('../constants');

function PasswordService() {
  this.hashPassword = function hashPassword(plainTextPassword) {
    return bcrypt.hashSync(plainTextPassword, PASSWORD_SALT_ROUND);
  };

  this.verifyPassword = function verifyPassword(plainTestPassword, hashedPassword) {
    return bcrypt.compareSync(plainTestPassword, hashedPassword);
  };
}

module.exports = PasswordService;
