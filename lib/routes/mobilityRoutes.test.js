require('dotenv').config();
const request = require('supertest');
const app = require('../app');
const connect = require('../utils/connect.js');
const mongoose = require('mongoose');

const MobilityData = require('../models/MobilityData');

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
