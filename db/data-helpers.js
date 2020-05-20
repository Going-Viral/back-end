require('dotenv').config();

const connect = require('../lib/utils/connect');
const seed = require('./seed');
const mongoose = require('mongoose');
const fs = require('fs');
const request = require('supertest');
const app = require('../lib/app');

beforeAll(() => {
  connect();
});

// beforeEach(() => {
//   return mongoose.connection.dropDatabase();
// });

beforeEach(() => {
  return seed();
});

afterAll(() => {
  return mongoose.connection.close();
});

module.exports = { ...getters };
