const { Router } = require('express');
const CovidData = require('../models/CovidData');


module.exports = Router()
  // global map fetch
  .get('/', (req, res, next) => {
    CovidData
      // .find().where('countryName').ne('Worldwide')
      .find({ countryCode: { $ne: null } })
      .limit(1)
      .then(cases => res.send(cases))
      .catch(next);
  });
