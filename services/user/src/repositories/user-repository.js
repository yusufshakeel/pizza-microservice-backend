'use strict';

const { UserModel } = require('../models/user-model');
const { hashPassword } = require('../services/password-service');

module.exports = function UserRepository() {
  this.fetchUserById = async function fetchUserById(userId) {
    return await UserModel.findOne({ userId, accountStatue: 'ACTIVE' }, { password: 0 });
  };

  this.signUp = async function signUp(user) {
    const userModel = UserModel({
      ...user,
      password: hashPassword(user.password)
    });
    return await userModel.save();
  };

  this.logIn = async function logIn(emailAddress) {
    return await UserModel.findOne({
      email: { address: emailAddress },
      accountStatus: 'ACTIVE'
    });
  };

  this.update = async function update(userId, user) {
    const result = await UserModel.updateOne(
      {
        userId,
        accountStatus: 'ACTIVE'
      },
      { $set: { ...user, updatedAt: Date.now() } }
    );
    if (!result.modifiedCount) {
      return null;
    }
    return { userId };
  };

  this.updatePassword = async function updatePassword(userId, hashedPassword) {
    const result = await UserModel.updateOne(
      {
        userId,
        accountStatus: 'ACTIVE'
      },
      { $set: { password: hashedPassword } }
    );
    if (!result.modifiedCount) {
      return null;
    }
    return { userId };
  };
};
