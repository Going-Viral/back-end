const { Router } = require('express');
const CovidData = require('../models/CovidData');
const TestCovidData = require('../models/TestCovidData');


module.exports = Router()
  // 1: homepage chart fetch w global-level data 
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

  // 2: fetch by countryCode for all dates - excludes subregions 
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

  // 3: fetch subregions with country code
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
  })

// 4: fetch by countryName for all dates - excludes subregions 
  .get('/countryByName/:countryName', (req, res, next) => {
    CovidData
      .find({ 
        countryName: req.params.countryName,
        subRegion1: null
      })
      .then(cases => res.send(cases))
      .catch(next);
  })
  
  .get('/countryByName/:countryName/test', (req, res, next) => {
    TestCovidData
      .find({ 
        countryName: req.params.countryName,
        subRegion1: null
      })
      .then(cases => res.send(cases))
      .catch(next);
  })

// 2: fetch by countryCode and subRegion1 for all dates - excludes subregion2
  .get('/bySub/:countryCode/:subRegion1', (req, res, next) => {
    CovidData
      .find({ 
        countryCode: req.params.countryCode,
        subRegion1: req.params.subRegion1,
        subRegion2: null
      })
      .then(cases => res.send(cases))
      .catch(next);
  })
  
  .get('/bySub/:countryCode/:subRegion1/test', (req, res, next) => {
    TestCovidData
      .find({ 
        countryCode: req.params.countryCode,
        subRegion1: req.params.subRegion1,
        subRegion2: null
      })
      .then(cases => res.send(cases))
      .catch(next);
  });
  
