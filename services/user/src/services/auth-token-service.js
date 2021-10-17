'use strict';

const jwt = require('jsonwebtoken');
const { JWT_LIFESPAN, JWT_SECRET } = require('../constants');
const AuthTokenError = require('../errors/auth-token-error');

function AuthTokenService() {
  this.createAuthToken = function createAuthToken(userId) {
    const now = Math.floor(Date.now() / 1000);
    return jwt.sign(
      {
        userId,
        iat: now,
        exp: now + JWT_LIFESPAN
      },
      JWT_SECRET
    );
  };

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
