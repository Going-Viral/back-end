const { Router } = require('express');
const CovidData = require('../models/CovidData');
const TestCovidData = require('../models/TestCovidData');


module.exports = Router()
  // global map fetch
  .get('/', (req, res, next) => {
    CovidData
      // .find().where('countryName').ne('Worldwide')
      .find({ countryCode: { $ne: null } })
      .limit(1)
      .then(cases => res.send(cases))
      .catch(next);
  })

  .get('/test', (req, res, next) => {
    TestCovidData
      // .find().where('countryName').ne('Worldwide')
      .find({ countryCode: { $ne: null } })
      .limit(1)
      .then(cases => res.send(cases))
      .catch(next);
  });
