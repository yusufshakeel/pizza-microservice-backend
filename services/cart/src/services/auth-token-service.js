'use strict';

const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../constants');
const AuthTokenError = require('../errors/auth-token-error');

function AuthTokenService() {
  this.verifyAuthToken = function verifyAuthToken(token) {
    try {
      const { userId } = jwt.verify(token, JWT_SECRET);
      return { userId };
    } catch (err) {
      throw new AuthTokenError('Auth token verification failed', err);
    }
  };
}

module.exports = AuthTokenService;
