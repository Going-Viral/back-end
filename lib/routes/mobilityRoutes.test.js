require('dotenv').config();
const request = require('supertest');
const app = require('../app');
const connect = require('../utils/connect.js');
const mongoose = require('mongoose');

expect.extend({
  toBeTypeOrNull(received, argument) {
    if(received === null){
      return {
        pass: true,
        message: () => 'Ok'
      };
    }
    expect(received).toEqual(expect.any(argument));
    return {
      pass: true,
      message: () => 'Ok'
    };
  }
});

describe('mobility data', () => {
  beforeAll(() => {
    connect();
  });
  afterAll(() => {
    return mongoose.connection.close();
  });

  it('fetches country data', () => {
    return request(app)
      .get('/api/v1/mobility')
      .then(res => {
        expect(res.body).toContainEqual({
          _id: expect.any(String),
          date: expect.any(String),
          countryCode: expect.any(String),
          countryName: expect.any(String),
          subRegion1: expect.any(String),
          subRegion2: expect.any(String),
          retailChange: expect.any(Number),
          groceryChange: expect.any(Number),
          parksChange: expect.any(Number),
          transitChange: expect.any(Number),
          workplacesChange: expect.any(Number),
          residentialChange: expect.any(Number),
          __v: 0
        });
      });
  });

  it('fetches country-level data by date', () => {
    return request(app)
      .get('/api/v1/mobility/date')
      .then(res => {
        expect(res.body).toContainEqual({
          _id: expect.any(String),
          date: expect.any(String),
          countryCode: expect.any(String),
          countryName: expect.toBeTypeOrNull(String),
          subRegion1: null,
          subRegion2: null,
          retailChange: expect.toBeTypeOrNull(Number),
          groceryChange: expect.toBeTypeOrNull(Number),
          parksChange: expect.toBeTypeOrNull(Number),
          transitChange: expect.toBeTypeOrNull(Number),
          workplacesChange: expect.toBeTypeOrNull(Number),
          residentialChange: expect.toBeTypeOrNull(Number),
          __v: 0
        });
      });
  });
});
