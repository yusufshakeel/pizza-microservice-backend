'use strict';

const path = require('path');
const { SCHEMA_LOCATION_V1 } = require('../constants/schema-constants');

module.exports = function SchemaRepository(parser) {
  const self = this;
  this.schemas = {};

  this.loadAll = async function() {
    const fetchUserByIdParams = await parser.dereference(
      path.join(SCHEMA_LOCATION_V1, 'user-fetch-params.json')
    );

    const fetchUserByIdResponse = await parser.dereference(
      path.join(SCHEMA_LOCATION_V1, 'user-fetch-response.json')
    );

    const userSignUpRequest = await parser.dereference(
      path.join(SCHEMA_LOCATION_V1, 'user-signup-request.json')
    );

    const userSignUpResponse = await parser.dereference(
      path.join(SCHEMA_LOCATION_V1, 'user-signup-response.json')
    );

    const userLogInRequest = await parser.dereference(
      path.join(SCHEMA_LOCATION_V1, 'user-login-request.json')
    );

    const userLogInResponse = await parser.dereference(
      path.join(SCHEMA_LOCATION_V1, 'user-login-response.json')
    );

    const patchPasswordParams = await parser.dereference(
      path.join(SCHEMA_LOCATION_V1, 'user-patch-password-params.json')
    );

    const patchPasswordRequest = await parser.dereference(
      path.join(SCHEMA_LOCATION_V1, 'user-patch-password-request.json')
    );

    const patchPasswordResponse = await parser.dereference(
      path.join(SCHEMA_LOCATION_V1, 'user-patch-password-response.json')
    );

    const patchUserParams = await parser.dereference(
      path.join(SCHEMA_LOCATION_V1, 'user-patch-params.json')
    );

    const patchUserRequest = await parser.dereference(
      path.join(SCHEMA_LOCATION_V1, 'user-patch-request.json')
    );

    const patchUserResponse = await parser.dereference(
      path.join(SCHEMA_LOCATION_V1, 'user-patch-response.json')
    );

    const v1Schemas = {
      users: {
        fetchUserById: {
          params: fetchUserByIdParams,
          response: fetchUserByIdResponse
        },
        signUp: {
          request: userSignUpRequest,
          response: userSignUpResponse
        },
        logIn: {
          request: userLogInRequest,
          response: userLogInResponse
        },
        patchPassword: {
          params: patchPasswordParams,
          request: patchPasswordRequest,
          response: patchPasswordResponse
        },
        patch: {
          params: patchUserParams,
          request: patchUserRequest,
          response: patchUserResponse
        }
      }
    };

    self.schemas = {
      v1: v1Schemas
    };

    return self.schemas;
  };
};
