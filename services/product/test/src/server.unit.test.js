'use strict';
const Server = require('../../src/server');
const fastifyModule = require('fastify');

test('Should be able to setup server', async () => {
  const fastify = fastifyModule();
  await new Server({ fastify }).setup();
  const result = await fastify.inject({
    method: 'GET',
    url: '/liveness',
    accept: 'application/json'
  });
  expect(result.statusCode).toBe(200);
  await fastify.close();
});

test('Mock run server', async () => {
  const fastify = {
    register: jest.fn(),
    swagger: jest.fn(),
    listen: jest.fn((port, host, cb) => cb())
  };
  const server = await new Server({ fastify }).setup();
  await server.run();
  expect(fastify.listen).toHaveBeenCalledTimes(1);
});

test('Mock run server to throw error', async () => {
  const fastify = {
    register: jest.fn(),
    swagger: jest.fn(),
    listen: jest.fn((port, host, cb) => cb('someError'))
  };
  try {
    const server = await new Server({ fastify }).setup();
    await server.run();
  } catch (e) {
    expect(e).toBe('someError');
  }
  expect(fastify.listen).toHaveBeenCalledTimes(1);
});
