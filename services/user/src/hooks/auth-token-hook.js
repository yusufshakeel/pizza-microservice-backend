'use strict';

const AuthTokenService = require('../services/auth-token-service');
const AuthTokenError = require('../errors/auth-token-error');

const authTokenService = new AuthTokenService();

const pathShouldIgnoreAuthToken = [
  {
    urlPath: '/user/v1/users/login',
    method: 'POST',
    description: 'User log in'
  },
  {
    urlPath: '/user/v1/users',
    method: 'POST',
    description: 'User sign up'
  }
];

function AuthTokenHook(request, reply, done) {
  const url = request.raw.url;
  const method = request.raw.method;

  const matchingPathToIgnore = pathShouldIgnoreAuthToken.find(
    v => url.includes(v.urlPath) && method === v.method
  );

  if (matchingPathToIgnore) {
    console.info(
      `FASTIFY_HOOK_PRE_HANDLER AuthTokenHook Authorization Token verification is not needed for ${method} ${url}`
    );
  } else {
    try {
      const token = request.headers.authorization.replace('Bearer ', '');
      const { userId } = authTokenService.verifyAuthToken(token);
      request['x-user-id'] = userId;
    } catch (err) {
      throw new AuthTokenError('Auth failed!', err);
    }
  }

  done();
}

module.exports = AuthTokenHook;
