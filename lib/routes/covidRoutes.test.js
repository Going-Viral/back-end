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

describe('Covid data', () => {
  beforeAll(() => {
    connect();
  });
  afterAll(() => {
    return mongoose.connection.close();
  });
  it('fetches total covid data', () => {
    const countryName = 'Worldwide';
    return request(app)
      .get('/api/v1/covid/test')
      .then(res => {
        expect(res.body).toContainEqual({
          _id: expect.any(String),
          id: expect.any(Number),
          date: expect.any(String),
          totalCases: expect.any(Number),
          newCases: expect.toBeTypeOrNull(Number),
          totalDeaths: expect.toBeTypeOrNull(Number),
          newDeaths: expect.toBeTypeOrNull(Number),
          totalRecovered: expect.toBeTypeOrNull(Number),
          newRecovered: expect.toBeTypeOrNull(Number),
          latitude: null,
          longitude: null,
          countryCode: null,
          countryName: countryName,
          subRegion1: null,
          subRegion2: null,
          __v: 0
        });
      });
  });

  it('fetches covid data by countryName for all dates, excluding subregions', () => {
    const countryCode = 'AO';
    return request(app)
      .get(`/api/v1/covid/${countryCode}/test`)
      .then(res => {
        expect(res.body).toContainEqual({
          _id: expect.any(String),
          id: expect.any(Number),
          date: expect.any(String),
          totalCases: expect.any(Number),
          newCases: expect.toBeTypeOrNull(Number),
          totalDeaths: expect.toBeTypeOrNull(Number),
          newDeaths: expect.toBeTypeOrNull(Number),
          totalRecovered: expect.toBeTypeOrNull(Number),
          newRecovered: expect.toBeTypeOrNull(Number),
          latitude: expect.any(String),
          longitude: expect.any(String),
          countryCode: countryCode,
          countryName: expect.any(String),
          subRegion1: null,
          subRegion2: null,
          __v: 0
        });
      });
  });
  it('fetches subregions with country code', () => {
    const countryCode = 'CR';
    return request(app)
      .get(`/api/v1/covid/subRegion/${countryCode}/test`)
      .then(res => {
        expect(res.body).toContainEqual({
          _id: expect.any(String),
          id: expect.any(Number),
          date: expect.any(String),
          totalCases: expect.any(Number),
          newCases: expect.toBeTypeOrNull(Number),
          totalDeaths: expect.toBeTypeOrNull(Number),
          newDeaths: expect.toBeTypeOrNull(Number),
          totalRecovered: expect.toBeTypeOrNull(Number),
          newRecovered: expect.toBeTypeOrNull(Number),
          latitude: expect.any(String),
          longitude: expect.any(String),
          countryCode: countryCode,
          countryName: expect.any(String),
          subRegion1: expect.toBeTypeOrNull(String),
          subRegion2: expect.toBeTypeOrNull(String),
          __v: 0
        });
      });
  });
});