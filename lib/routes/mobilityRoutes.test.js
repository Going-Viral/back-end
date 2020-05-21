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
    return request(app)
      .get('/api/v1/mobility/2020-02-15T00:00:00.000+00:00/test')
      .then(res => {
        expect(res.body[0]).toEqual({
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

  it('fetches country-level data by date', () => {
    const data = {
      date: '2020-02-16T00:00:00.000Z',
      countryCode: 'US',
      countryName: 'United States',
      subRegion1: 'Oregon',
      subRegion2: 'Multnomah County',
      retailChange: 21,
      groceryChange: 0,
      parksChange: 29,
      transitChange: 2,
      workplacesChange: 2,
      residentialChange: -1,
    };

    return request(app)
      .get('/api/v1/mobility/2020-02-16T00:00:00.000+00:00')
      .then(res => {
        expect(res.body[0]).toEqual({
          _id: expect.any(String),
          ...data,
          __v: 0
        });
      });
  });
});
