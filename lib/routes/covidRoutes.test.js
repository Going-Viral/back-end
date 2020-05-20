require('dotenv').config();
const request = require('supertest');
const app = require('../app');
const connect = require('../utils/connect.js');
const mongoose = require('mongoose');

expect.extend({
  toBeTypeOrNull(received, argument) {
    const pass = expect(received).toEqual(expect.any(argument));
    if(pass || received === null) {
      return {
        message: () => 'Ok',
        pass: true
      };
    } else {
      return {
        message: () => 'expected ${received} to be ${argument} type or null',
        pass: false
      };
    }
  }
});
const CovidData = require('../models/CovidData');

describe('Covid data', () => {
  beforeAll(() => {
    connect();
  });
  afterAll(() => {
    return mongoose.connection.close();
  });
  it('fetches total covid case data', () => {
    return request(app)
      .get('/api/v1/covid')
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          id: expect.any(String),
          date: expect.any(String),
          totalCases: expect.any(Number),
          newCases: expect.toBeTypeOrNull(Number),
          totalDeaths: expect.toBeTypeOrNull(Number),
          newDeaths: expect.toBeTypeOrNull(Number),
          totalRecovered: expect.toBeTypeOrNull(Number),
          newRecovered: expect.toBeTypeOrNull(Number),
          latitude: expect.any(Number),
          longitude: expect.any(Number),
          countryCode: expect.toBeTypeOrNull(String),
          subRegion1: expect.toBeTypeOrNull(String),
          subRegion2: expect.toBeTypeOrNull(String),
          __v: 0
        });
      });
  });
});
