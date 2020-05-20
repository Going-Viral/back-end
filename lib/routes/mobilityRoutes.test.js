require('dotenv').config();
const request = require('supertest');
const app = require('../app');
const connect = require('../utils/connect.js');
const mongoose = require('mongoose');
const MobilityData = require('../models/MobilityData');

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
});
