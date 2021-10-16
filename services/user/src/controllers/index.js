'use strict';

const { createAuthToken } = require('../services/auth-token-service');
const { hashPassword, verifyPassword } = require('../services/password-service');
const UserNotFoundError = require('../errors/user-not-found-error');
const LogInError = require('../errors/login-error');

module.exports = function Controller({ userRepository }) {
  this.fetchUserById = async function fetchUserById(userId) {
    const fetchedUser = await userRepository.fetchUserById(userId);
    if (!fetchedUser) {
      throw new UserNotFoundError(userId);
    }
    return { data: fetchedUser };
  };

  this.signUp = async function signUp(user) {
    const createdUser = await userRepository.signUp(user);
    return { data: createdUser };
  };

  this.logIn = async function logIn(user) {
    const { emailAddress, password } = user;
    const loggedInUser = await userRepository.logIn(emailAddress);

    if (!loggedInUser) {
      throw new UserNotFoundError();
    }

    if (!verifyPassword(password, loggedInUser.password)) {
      throw new LogInError({ email: emailAddress, userId: loggedInUser.userId });
    }

    const token = createAuthToken(loggedInUser.userId);

    return { data: { userId: loggedInUser.userId, token } };
  };

  this.updatePassword = async function updatePassword(userId, password) {
    const hashedPassword = hashPassword(password);
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
