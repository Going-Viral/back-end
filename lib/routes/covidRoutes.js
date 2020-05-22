const { Router } = require('express');
const CovidData = require('../models/CovidData');
const TestCovidData = require('../models/TestCovidData');


module.exports = Router()
  // global map fetch - excludes 'worldwide' 
  .get('/', (req, res, next) => {
    CovidData
      // .find().where('countryName').ne('Worldwide')
      .find({ countryCode: { $ne: null } })
      .then(cases => res.send(cases))
      .catch(next);
  })

  .get('/test', (req, res, next) => {
    TestCovidData
      // .find().where('countryName').ne('Worldwide')
      .find({ countryCode: { $ne: null } })
      .then(cases => res.send(cases))
      .catch(next);
  })

  // fetch by country for all dates - excludes subregions 
  .get('/:country', (req, res, next) => {
    CovidData
      .find({ countryName: req.params.country })
      .find({ subRegion1: null })
      .then(cases => res.send(cases))
      .catch(next);
  })

  .get('/:country/test', (req, res, next) => {
    TestCovidData
      .find({ countryName: req.params.country })
      .find({ subRegion1: null })
      .then(cases => res.send(cases))
      .catch(next);
  });
