'use strict';

const UserRepository = require('../../../../src/repositories/user-repository');

describe('UserRepository', () => {
  describe('fetchUserById', () => {
    test('Should return user', async () => {
      const UserModel = {
        findOne: jest.fn(() => ({ userId: '87b96c89-5365-4cf0-a104-b28da006c2d7' }))
      };
      const userRepository = new UserRepository({ UserModel });
      const result = await userRepository.fetchUserById('87b96c89-5365-4cf0-a104-b28da006c2d7');
      expect(result).toStrictEqual({
        userId: '87b96c89-5365-4cf0-a104-b28da006c2d7'
      });
    });
  });

  describe('signUp', () => {
    test('Should create user', async () => {
      const UserModel = function () {
        return {
          save: jest.fn(() => {
            return { userId: '87b96c89-5365-4cf0-a104-b28da006c2d7' };
          })
        };
      };
      const userRepository = new UserRepository({ UserModel });
      const result = await userRepository.signUp({
        emailAddress: 'janedoe@example.com',
        password: 'root1234'
      });
      expect(result).toStrictEqual({
        userId: '87b96c89-5365-4cf0-a104-b28da006c2d7'
      });
    });
  });

  describe('logIn', () => {
    test('Should log in user', async () => {
      const UserModel = {
        findOne: jest.fn(() => {
          return { userId: '87b96c89-5365-4cf0-a104-b28da006c2d7' };
        })
      };
      const userRepository = new UserRepository({ UserModel });
      const result = await userRepository.logIn({
        emailAddress: 'janedoe@example.com',
        password: 'root1234'
      });
      expect(result).toStrictEqual({
        userId: '87b96c89-5365-4cf0-a104-b28da006c2d7'
      });
    });
  });

  describe('update', () => {
    describe('When user found that can be updated', () => {
      test('Should update details', async () => {
        const UserModel = {
          updateOne: jest.fn(() => {
            return { modifiedCount: 1 };
          })
        };
        const userRepository = new UserRepository({ UserModel });
        const result = await userRepository.update('87b96c89-5365-4cf0-a104-b28da006c2d7', {
          firstName: 'Jane'
        });
        expect(result).toStrictEqual({
          userId: '87b96c89-5365-4cf0-a104-b28da006c2d7'
        });
      });
    });

    describe('When user is not found', () => {
      test('Should return null', async () => {
        const UserModel = {
          updateOne: jest.fn(() => {
            return { modifiedCount: 0 };
          })
        };
        const userRepository = new UserRepository({ UserModel });
        const result = await userRepository.update('87b96c89-5365-4cf0-a104-b28da006c2d7', {
          firstName: 'Jane'
        });
        expect(result).toBeNull();
      });
    });
  });

  describe('updatePassword', () => {
    describe('When user found that can be updated', () => {
      test('Should update details', async () => {
        const UserModel = {
          updateOne: jest.fn(() => {
            return { modifiedCount: 1 };
          })
        };
        const userRepository = new UserRepository({ UserModel });
        const result = await userRepository.updatePassword(
          '87b96c89-5365-4cf0-a104-b28da006c2d7',
          '$2b$10$A86UQ0vflYPN0mAveocS4uTeV8cgQ7uZ.wj.yUYKLzgrdTtKMyPd6'
        );
        expect(result).toStrictEqual({
          userId: '87b96c89-5365-4cf0-a104-b28da006c2d7'
        });
      });
    });

    describe('When user is not found', () => {
      test('Should return null', async () => {
        const UserModel = {
          updateOne: jest.fn(() => {
            return { modifiedCount: 0 };
          })
        };
        const userRepository = new UserRepository({ UserModel });
        const result = await userRepository.updatePassword(
          '87b96c89-5365-4cf0-a104-b28da006c2d7',
          '$2b$10$A86UQ0vflYPN0mAveocS4uTeV8cgQ7uZ.wj.yUYKLzgrdTtKMyPd6'
        );
        expect(result).toBeNull();
      });
    });
  });
});
