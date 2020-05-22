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
      .get('/api/v1/mobility/test')
      .then(res => {
        expect(res.body).toContainEqual({
          _id: expect.any(String),
          date: expect.any(String),
          countryCode: expect.any(String),
          countryName: expect.toBeTypeOrNull(String),
          subRegion1: expect.toBeTypeOrNull(String),
          subRegion2: expect.toBeTypeOrNull(String),
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

  it('fetches country-level data by date', () => {
    const date = '2020-02-15T00:00:00.000+00:00';
    return request(app)
      .get(`/api/v1/mobility/${date}/test`)
      .then(res => {
        expect(res.body).toContainEqual({
          _id: expect.any(String),
          date: date,
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

  it('fetches country-level data by country code', () => {
    const countryCode = 'AO';
    return request(app)
      .get(`/api/v1/mobility/${countryCode}/test`)
      .then(res => {
        expect(res.body).toContainEqual({
          _id: expect.any(String),
          date: expect.any(String),
          countryCode: countryCode,
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
