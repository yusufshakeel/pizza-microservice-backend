'use strict';

module.exports = function UserRepository() {
  this.fetchUserById = async function fetchUserById(userId) {
    return {
      userId,
      firstName: 'Jane',
      lastName: 'Doe',
      email: {
        address: 'janedoe@example.com'
      },
      contactPhone: {
        countryCode: '91',
        phoneNumber: '9800098000'
      },
      address: {
        line1: 'Address line 1',
        line2: 'Address line 2',
        line3: 'Address line 3',
        city: 'Bangalore',
        state: 'KA',
        country: 'IND',
        postcode: '560001'
      }
    };
  };

  this.signUp = async function signUp(user) {
    return {
      userId: '4eebd595-bdbe-4971-b04e-a84192a21f98'
    };
  };

  this.logIn = async function logIn(emailAddress, hashedPassword) {
    return {
      userId: '4eebd595-bdbe-4971-b04e-a84192a21f98'
    };
  };

  this.update = async function update(userId, user) {
    return {
      userId: '4eebd595-bdbe-4971-b04e-a84192a21f98'
    };
  };

  this.updatePassword = async function updatePassword(userId, hashedPassword) {
    return { userId };
  };
};