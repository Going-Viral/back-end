const { Router } = require('express');
const MobilityData = require('../models/MobilityData');
const TestMobilityData = require('../models/TestMobilityData');

module.exports = Router()
  // 1: global map fetch all mobility data, excluding subregions
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

// 2: global map fetch all data for one date, excluding subregions
  .get('/:date', (req, res, next) => {
    MobilityData
      .find({ 
        date: req.params.date,
        subRegion1: null
      })
      .then(data => res.send(data))
      .catch(next);
  })

  .get('/:date/test', (req, res, next) => {
    TestMobilityData
      .find({ 
        date: req.params.date,
        subRegion1: null
      })
      .then(data => res.send(data))
      .catch(next);
  })

// 3: fetch all data for a single country by code, excluding subregions
  .get('/country/:countryCode', (req, res, next) => {
    MobilityData
      .find({ 
        countryCode: req.params.countryCode, 
        subRegion1: null 
      })
      .then(data => res.send(data))
      .catch(next);
  })

  .get('/country/:countryCode/test', (req, res, next) => {
    TestMobilityData
      .find({ 
        countryCode: req.params.countryCode, 
        subRegion1: null 
      })
      .then(data => res.send(data))
      .catch(next);
  })

// 4: fetch all data for a single country by code, including subregions, 
  .get('/countryWithSub/:countryCode', (req, res, next) => {
    MobilityData
      .find({ 
        countryCode: req.params.countryCode,
        subRegion2: null
      })
      .then(data => res.send(data))
      .catch(next);
  })

  .get('/countryWithSub/:countryCode/test', (req, res, next) => {
    TestMobilityData
      .find({ 
        countryCode: req.params.countryCode,
        subRegion2: null
      })
      .then(data => res.send(data))
      .catch(next);
  })

// ?fetch all data for a single country by name, excluding subregions
// ?fetch all data for a single country by name, including subregions

// 5: fetch all data for a single subregion1, excluding subregion2s
  .get('/countryBySub/:countryCode/:subRegion1', (req, res, next) => {
    MobilityData
      .find({ 
        countryCode: req.params.countryCode,
        subRegion1: req.params.subRegion1,
        subRegion2: null
      })
      .then(data => res.send(data))
      .catch(next);
  })

  .get('/countryBySub/:countryCode/:subRegion1/test', (req, res, next) => {
    TestMobilityData
      .find({ 
        countryCode: req.params.countryCode,
        subRegion1: req.params.subRegion1,
        subRegion2: null
      })
      .then(data => res.send(data))
      .catch(next);
  })

// 6: fetch all data for a single subregion1, including subregion2s
  .get('/subRegionWithSub2/:countryCode/:subRegion1', (req, res, next) => {
    MobilityData
      .find({
        countryCode: req.params.countryCode,
        subRegion1: req.params.subRegion1
      })
      .then(data => res.send(data))
      .catch(next);
  })
  
  .get('/subRegionWithSub2/:countryCode/:subRegion1/test', (req, res, next) => {
    TestMobilityData
      .find({
        countryCode: req.params.countryCode,
        subRegion1: req.params.subRegion1
      })
      .then(data => res.send(data))
      .catch(next);
  })

  // 7: fetch one record per subRegion1 by countryCode and date
  .get('/names/:date/:countryCode', (req, res, next) => {
    MobilityData
      .find({ 
        date: '2020-05-01',
        subRegion2: null
      })
      .then(data => res.send(data))
      .catch(next);
  })

  .get('/names/:date/:countryCode/test', (req, res, next) => {
    TestMobilityData
      .find({ 
        date: '2020-05-01',
        subRegion2: null
      })
      .then(data => res.send(data))
      .catch(next);
  });
