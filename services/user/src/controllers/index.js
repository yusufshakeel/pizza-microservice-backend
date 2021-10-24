'use strict';

const { v4: uuidv4 } = require('uuid');
const AuthTokenService = require('../services/auth-token-service');
const PasswordService = require('../services/password-service');
const UserNotFoundError = require('../errors/user-not-found-error');
const LogInError = require('../errors/login-error');

module.exports = function Controller({ userRepository }) {
  const authTokenService = new AuthTokenService();
  const passwordService = new PasswordService();

  const isAvailable = bool => ({ data: { isAvailable: bool } });

  this.isContactPhoneAvailableForSignUp = async function isContactPhoneAvailableForSignUp(
    contactPhone
  ) {
    const fetchedResult = await userRepository.isContactPhoneAvailableForSignUp(contactPhone);
    if (!fetchedResult) {
      return isAvailable(true);
    }
    return isAvailable(false);
  };

  this.isEmailAvailableForSignUp = async function isEmailAvailableForSignUp(emailAddress) {
    const fetchedResult = await userRepository.isEmailAvailableForSignUp(emailAddress);
    if (!fetchedResult) {
      return isAvailable(true);
    }
    return isAvailable(false);
  };

  this.fetchUserById = async function fetchUserById(userId) {
    const fetchedUser = await userRepository.fetchUserById(userId);
    if (!fetchedUser) {
      throw new UserNotFoundError(userId);
    }
    return { data: fetchedUser };
  };

  this.signUp = async function signUp(user) {
    const createdUser = await userRepository.signUp({
      ...user,
      userId: uuidv4(),
      password: passwordService.hashPassword(user.password)
    });
    return { data: { userId: createdUser.userId } };
  };

  this.logIn = async function logIn(user) {
    const { emailAddress, password } = user;
    const loggedInUser = await userRepository.logIn(emailAddress);

    if (!loggedInUser) {
      throw new UserNotFoundError();
    }

    if (!passwordService.verifyPassword(password, loggedInUser.password)) {
      throw new LogInError({ email: emailAddress, userId: loggedInUser.userId });
    }

    const token = authTokenService.createAuthToken(loggedInUser.userId);

    return { data: { userId: loggedInUser.userId, token } };
  };

  this.updatePassword = async function updatePassword(userId, password) {
    const hashedPassword = passwordService.hashPassword(password);
    const updatedUser = await userRepository.updatePassword(userId, hashedPassword);

    if (!updatedUser) {
      throw new UserNotFoundError(userId);
    }

    return { data: { userId: updatedUser.userId } };
  };

  this.update = async function update(userId, user) {
    const updatedUser = await userRepository.update(userId, user);

    if (!updatedUser) {
      throw new UserNotFoundError(userId);
    }

    return { data: { userId: updatedUser.userId } };
  };
};
