'use strict';

const Controller = require('../../../../src/controllers');
const UserNotFoundError = require('../../../../src/errors/user-not-found-error');

describe('Testing controller', () => {
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

  describe('signUp', () => {});

  describe('logIn', () => {});

  describe('updatePassword', () => {});

  describe('update', () => {});
});
