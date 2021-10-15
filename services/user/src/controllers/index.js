'use strict';

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { PASSWORD_SALT_ROUND } = require('../constants');
const { JWT_LIFESPAN, JWT_SECRET } = require('../constants');
const UserNotFoundError = require('../errors/user-not-found-error');

module.exports = function Controller({ userRepository }) {
  this.fetchUserById = async function fetchUserById(userId) {
    const fetchedUser = await userRepository.fetchUserById(userId);
    if (fetchedUser) {
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
    const hashedPassword = bcrypt.hashSync(password, PASSWORD_SALT_ROUND);
    const loggedInUser = await userRepository.logIn(emailAddress, hashedPassword);

    if (!loggedInUser.userId) {
      throw new UserNotFoundError(loggedInUser.userId);
    }

    const now = Math.floor(Date.now() / 1000);
    const token = jwt.sign(
      {
        iat: now,
        exp: now + JWT_LIFESPAN,
        userId: loggedInUser.userId
      },
      JWT_SECRET
    );

    return { data: { userId: loggedInUser.userId, token } };
  };

  this.updatePassword = async function updatePassword(userId, password) {
    const hashedPassword = bcrypt.hashSync(password, PASSWORD_SALT_ROUND);
    const updatedUser = await userRepository.updatePassword(userId, hashedPassword);
    if (!updatedUser) {
      throw new UserNotFoundError(userId);
    }
    return { data: updatedUser };
  };

  this.update = async function update(userId, user) {
    const updatedUser = await userRepository.update(userId, user);
    if (!updatedUser) {
      throw new UserNotFoundError(userId);
    }
    return { data: updatedUser };
  };
};
