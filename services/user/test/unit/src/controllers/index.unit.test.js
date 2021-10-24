'use strict';

const PasswordService = require('../../../../src/services/password-service');
const Controller = require('../../../../src/controllers');
const UserNotFoundError = require('../../../../src/errors/user-not-found-error');

const passwordService = new PasswordService();

describe('Testing controller', () => {
  describe('isEmailAvailableForSignUp', () => {
    describe('When email is available', () => {
      test('Should return true', async () => {
        const userRepository = {
          isEmailAvailableForSignUp: jest.fn()
        };
        const controller = new Controller({ userRepository });
        const result = await controller.isEmailAvailableForSignUp('johndoe@example.com');
        expect(result).toStrictEqual({
          data: {
            isAvailable: true
          }
        });
      });
    });

    describe('When email is not available', () => {
      test('Should return false', async () => {
        const userRepository = {
          isEmailAvailableForSignUp: jest.fn(() => {
            return { userId: '87b96c89-5365-4cf0-a104-b28da006c2d7' };
          })
        };
        const controller = new Controller({ userRepository });
        const result = await controller.isEmailAvailableForSignUp('johndoe@example.com');
        expect(result).toStrictEqual({
          data: {
            isAvailable: false
          }
        });
      });
    });
  });

  describe('fetchUserById', () => {
    describe('When user is present', () => {
      test('Should return user data', async () => {
        const userRepository = {
          fetchUserById: jest.fn(() => {
            return {
              userId: '87b96c89-5365-4cf0-a104-b28da006c2d7'
            };
          })
        };
        const controller = new Controller({ userRepository });
        const result = await controller.fetchUserById('87b96c89-5365-4cf0-a104-b28da006c2d7');
        expect(result).toStrictEqual({
          data: {
            userId: '87b96c89-5365-4cf0-a104-b28da006c2d7'
          }
        });
      });
    });

    describe('When user is not present', () => {
      test('Should throw error', async () => {
        const userRepository = {
          fetchUserById: jest.fn()
        };
        const controller = new Controller({ userRepository });
        await expect(
          controller.fetchUserById('87b96c89-5365-4cf0-a104-b28da006c2d7')
        ).rejects.toThrow(new UserNotFoundError('87b96c89-5365-4cf0-a104-b28da006c2d7'));
      });
    });
  });

  describe('signUp', () => {
    test('Should create user', async () => {
      const userRepository = {
        signUp: jest.fn(() => {
          return {
            userId: '87b96c89-5365-4cf0-a104-b28da006c2d7'
          };
        })
      };
      const controller = new Controller({ userRepository });
      const result = await controller.signUp({
        firstName: 'Jane',
        lastName: 'Doe',
        emailAddress: 'janedoe@example.com',
        password: 'root1234'
      });
      expect(result).toStrictEqual({
        data: {
          userId: '87b96c89-5365-4cf0-a104-b28da006c2d7'
        }
      });
    });
  });

  describe('logIn', () => {
    describe('When user is not present', () => {
      test('Should throw error', async () => {
        const userRepository = {
          logIn: jest.fn()
        };
        const controller = new Controller({ userRepository });
        await expect(
          controller.logIn({
            emailAddress: 'janedoe@example.com',
            password: 'root1234'
          })
        ).rejects.toThrow('User not found');
      });
    });

    describe('When login password is incorrect', () => {
      test('Should throw error', async () => {
        const userRepository = {
          logIn: jest.fn(() => ({
            password: passwordService.hashPassword('root')
          }))
        };
        const controller = new Controller({ userRepository });
        await expect(
          controller.logIn({
            emailAddress: 'janedoe@example.com',
            password: 'root1234'
          })
        ).rejects.toThrow('Log in details are incorrect');
      });
    });

    describe('When login details are correct', () => {
      test('Should not throw error', async () => {
        const userRepository = {
          logIn: jest.fn(() => ({
            userId: '87b96c89-5365-4cf0-a104-b28da006c2d7',
            password: passwordService.hashPassword('root1234')
          }))
        };
        const controller = new Controller({ userRepository });
        const result = await controller.logIn({
          emailAddress: 'janedoe@example.com',
          password: 'root1234'
        });
        expect(result).toStrictEqual({
          data: {
            userId: '87b96c89-5365-4cf0-a104-b28da006c2d7',
            token: expect.any(String)
          }
        });
      });
    });
  });

  describe('updatePassword', () => {
    describe('When user is not present', () => {
      test('Should throw error', async () => {
        const userRepository = {
          updatePassword: jest.fn()
        };
        const controller = new Controller({ userRepository });
        await expect(
          controller.updatePassword('87b96c89-5365-4cf0-a104-b28da006c2d7', 'root1234')
        ).rejects.toThrow('User not found');
      });
    });

    describe('When details are correct', () => {
      test('Should not throw error', async () => {
        const userRepository = {
          updatePassword: jest.fn(() => ({
            userId: '87b96c89-5365-4cf0-a104-b28da006c2d7'
          }))
        };
        const controller = new Controller({ userRepository });
        const result = await controller.updatePassword(
          '87b96c89-5365-4cf0-a104-b28da006c2d7',
          'root1234'
        );
        expect(result).toStrictEqual({
          data: {
            userId: '87b96c89-5365-4cf0-a104-b28da006c2d7'
          }
        });
      });
    });
  });

  describe('update', () => {
    describe('When user is not present', () => {
      test('Should throw error', async () => {
        const userRepository = {
          update: jest.fn()
        };
        const controller = new Controller({ userRepository });
        await expect(
          controller.update('87b96c89-5365-4cf0-a104-b28da006c2d7', { firstName: 'Jane' })
        ).rejects.toThrow('User not found');
      });
    });

    describe('When details are correct', () => {
      test('Should not throw error', async () => {
        const userRepository = {
          update: jest.fn(() => ({
            userId: '87b96c89-5365-4cf0-a104-b28da006c2d7'
          }))
        };
        const controller = new Controller({ userRepository });
        const result = await controller.update('87b96c89-5365-4cf0-a104-b28da006c2d7', {
          firstName: 'Jane'
        });
        expect(result).toStrictEqual({
          data: {
            userId: '87b96c89-5365-4cf0-a104-b28da006c2d7'
          }
        });
      });
    });
  });
});
