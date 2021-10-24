'use strict';

const RepositoryError = require('../errors/repository-error');

module.exports = function UserRepository({ UserModel, errorable = RepositoryError() }) {
  this.isContactPhoneAvailableForSignUp = errorable(async function isContactPhoneAvailableForSignUp(
    contactPhone
  ) {
    return UserModel.findOne({ contactPhone }, { userId: 1 });
  });

  this.isEmailAvailableForSignUp = errorable(async function isEmailAvailableForSignUp(
    emailAddress
  ) {
    return UserModel.findOne({ emailAddress }, { userId: 1 });
  });

  this.fetchUserById = errorable(async function fetchUserById(userId) {
    return UserModel.findOne({ userId, accountStatue: 'ACTIVE' }, { password: 0 });
  });

  this.signUp = errorable(async function signUp(user) {
    const userModel = UserModel(user);
    return await userModel.save();
  });

  this.logIn = errorable(async function logIn(emailAddress) {
    return UserModel.findOne({
      emailAddress,
      accountStatus: 'ACTIVE'
    });
  });

  this.update = errorable(async function update(userId, user) {
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
  });

  this.updatePassword = errorable(async function updatePassword(userId, hashedPassword) {
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
  });
};
