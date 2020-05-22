const { Router } = require('express');
const MobilityData = require('../models/MobilityData');
const TestMobilityData = require('../models/TestMobilityData');

module.exports = Router()
  // global map fetch all mobility data
  .get('/', (req, res, next) => {
    MobilityData
      .find({ subRegion1: null })
      .then(country => res.send(country))
      .catch(next);
  })

  .get('/test', (req, res, next) => {
    TestMobilityData
      .find({ subRegion1: null })
      .then(country => res.send(country))
      .catch(next);
  })

// global map fetch all data for one date, excluding subregions
  .get('/:date', (req, res, next) => {
    MobilityData
      .find({ date: req.params.date })
      .find({ subRegion1: null })
      .then(data => res.send(data))
      .catch(next);
  })

  .get('/:date/test', (req, res, next) => {
    TestMobilityData
      .find({ date: req.params.date })
      .find({ subRegion1: null })
      .then(data => res.send(data))
      .catch(next);
  })

// fetch all data for a single country by code, excluding subregions

  .get('/country/:countryCode', (req, res, next) => {
    MobilityData
      .find({ countryCode: req.params.countryCode })
      .find({ subRegion1: null })
      .then(data => res.send(data))
      .catch(next);
  })

  .get('/country/:countryCode/test', (req, res, next) => {
    TestMobilityData
      .find({ countryCode: req.params.countryCode })
      .find({ subRegion1: null })
      .then(data => res.send(data))
      .catch(next);
  });

// fetch all data for a single country by code, including subregions

// fetch all data for a single country by name, excluding subregions

// fetch all data for a single country by name, including subregions

// fetch all data for a single subregion1, excluding subregion2s

// fetch all data for a single subregion1, including subregion2s
