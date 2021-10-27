'use strict';

const PasswordService = require('../../../../src/services/password-service');

const passwordService = new PasswordService();

describe('hashPassword', () => {
  test('Should hash plain text password', () => {
    const hashedPassword = passwordService.hashPassword('root1234');
    expect(hashedPassword).not.toBeUndefined();
  });
});

describe('verifyPassword', () => {
  const plainTextPassword = 'root1234';

  describe('When password to verify is correct', () => {
    test('Should return true', () => {
      const hashedPassword = '$2b$10$59R2h6nl2K84miaeY7dAxOcKDhmE.LyY8aPleWC2Hx990W06Pobw.';
      expect(passwordService.verifyPassword(plainTextPassword, hashedPassword)).toBeTruthy();
    });
  });

  describe('When password to verify is not correct', () => {
    test('Should return false', () => {
      const hashedPassword = '$2b$10$59R2h6nl2K84miaeY7dAxOcKDhmE.LyY8aPleWC2Hx990W060000.';
      expect(passwordService.verifyPassword(plainTextPassword, hashedPassword)).toBeFalsy();
    });
  });
});
