'use strict';

const { hashPassword, verifyPassword } = require('../../../../src/services/password-service');

describe('hashPassword', () => {
  test('Should hash plain text password', () => {
    const hashedPassword = hashPassword('root1234');
    expect(hashedPassword).not.toBeUndefined();
  });
});

describe('verifyPassword', () => {
  const plainTextPassword = 'root1234';

  describe('When password to verify is correct', () => {
    test('Should return true', () => {
      const hashedPassword = '$2b$10$59R2h6nl2K84miaeY7dAxOcKDhmE.LyY8aPleWC2Hx990W06Pobw.';
      expect(verifyPassword(plainTextPassword, hashedPassword)).toBeTruthy();
    });
  });

  describe('When password to verify is not correct', () => {
    test('Should return false', () => {
      const hashedPassword = '$2b$10$59R2h6nl2K84miaeY7dAxOcKDhmE.LyY8aPleWC2Hx990W060000.';
      expect(verifyPassword(plainTextPassword, hashedPassword)).toBeFalsy();
    });
  });
});