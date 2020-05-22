const { Router } = require('express');
const CovidData = require('../models/CovidData');
const TestCovidData = require('../models/TestCovidData');


module.exports = Router()
  // global map fetch - excludes 'worldwide' 
  .get('/', (req, res, next) => {
    CovidData
      .find({ countryName: 'Worldwide' })
      .then(cases => res.send(cases))
      .catch(next);
  })

  .get('/test', (req, res, next) => {
    TestCovidData
      .find({ countryName: 'Worldwide' })
      .then(cases => res.send(cases))
      .catch(next);
  })

  // fetch by country for all dates - excludes subregions 
  .get('/:countryCode', (req, res, next) => {
    CovidData
      .find({ 
        countryCode: req.params.countryCode,
        subRegion1: null
      })
      .then(cases => res.send(cases))
      .catch(next);
  })
  .get('/:countryCode/test', (req, res, next) => {
    TestCovidData
      .find({ 
        countryCode: req.params.countryCode,
        subRegion1: null
      })
      .then(cases => res.send(cases))
      .catch(next);
  })

  //fetch subregions with country code
  .get('/subRegion/:countryCode', (req, res, next) => {
    CovidData
      .find({ countryCode: req.params.countryCode })
      .then(cases => res.send(cases))
      .catch(next);
  })
  .get('/subRegion/:countryCode/test', (req, res, next) => {
    TestCovidData
      .find({ countryCode: req.params.countryCode })
      .then(cases => res.send(cases))
      .catch(next);
  });
