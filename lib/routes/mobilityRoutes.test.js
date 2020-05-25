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

  it('1 fetches world data', () => {
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

  it('2 fetches country-level data by date', () => {
    return request(app)
      .get('/api/v1/mobility/2020-02-15T00:00:00.000+00:00/test')
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

  it('3 fetches country-level data by country code', () => {
    const countryCode = 'AE';
    
    return request(app)
      .get(`/api/v1/mobility/country/${countryCode}/test`)
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

  it('4 fetches all data for a single country by code, including subregions', () => {
    const countryCode = 'AE';

    return request(app)
      .get(`/api/v1/mobility/countryWithSub/${countryCode}/test`)
      .then(res => {
        expect(res.body).toContainEqual({
          _id: expect.any(String),
          date: expect.any(String),
          countryCode: countryCode,
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
  
  // ?fetch all data for a single country by name, excluding subregions
  // ?fetch all data for a single country by name, including subregions

  it('5 fetches all data for a single subregion1, excluding subregion2s', () => {
    const countryCode = 'CA';
    const subRegion1 = 'Alberta';

    return request(app)
      .get(`/api/v1/mobility/countryBySub/${countryCode}/${subRegion1}/test`)
      .then(res => {
        expect(res.body).toContainEqual({
          _id: expect.any(String),
          date: expect.any(String),
          countryCode: countryCode,
          countryName: expect.toBeTypeOrNull(String),
          subRegion1: subRegion1,
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

  it('6 fetches all data for a single subregion1, including subregion2s', () => {
    const countryCode = 'US';
    const subRegion1 = 'Oregon';

    return request(app)
      .get(`/api/v1/mobility/subRegionWithSub2/${countryCode}/${subRegion1}/test`)
      .then(res => {
        expect(res.body).toContainEqual({
          _id: expect.any(String),
          date: expect.any(String),
          countryCode: countryCode,
          countryName: expect.toBeTypeOrNull(String),
          subRegion1: subRegion1,
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
});
