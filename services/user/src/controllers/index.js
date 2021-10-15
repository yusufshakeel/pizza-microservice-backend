'use strict';

const bcrypt = require('bcrypt');
const { PASSWORD_SALT_ROUND } = require('../constants');

module.exports = function Controller({ userRepository }) {
  this.fetchUserById = async function fetchUserById(userId) {
    const fetchedUser = await userRepository.fetchUserById(userId);
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
    return { data: loggedInUser };
  };

  this.updatePassword = async function updatePassword(userId, password) {
    const hashedPassword = bcrypt.hashSync(password, PASSWORD_SALT_ROUND);
    const updatedUser = await userRepository.updatePassword(userId, hashedPassword);
    return { data: updatedUser };
  };

  this.update = async function update(userId, user) {
    const updatedUser = await userRepository.update(userId, user);
    return { data: updatedUser };
  };
};
