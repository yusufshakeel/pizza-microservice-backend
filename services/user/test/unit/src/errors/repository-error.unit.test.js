'use strict';

const RepositoryError = require('../../../../src/errors/repository-error');

describe('RepositoryError', () => {
  describe('When repository operation is okay', () => {
    test('Should not throw error', async () => {
      const repositoryOperation = jest.fn();
      const errorable = RepositoryError();
      await expect(errorable(repositoryOperation)()).resolves.not.toThrow();
    });
  });

  describe('When repository operation is not okay', () => {
    test('Should throw error', async () => {
      const repositoryOperation = jest.fn(() => {
        throw new Error('Some error');
      });
      const errorable = RepositoryError();
      await expect(errorable(repositoryOperation)()).rejects.toThrow('Database access error');
    });
  });
});
