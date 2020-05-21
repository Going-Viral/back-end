const { Router } = require('express');
const MobilityData = require('../models/MobilityData');


module.exports = Router()
  // global map fetch all mobility data
  .get('/', (req, res, next) => {
    MobilityData
      .find()
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
    MobilityData
      .find({ date: req.params.date })
      .find({ subRegion1: null })
      .then(data => res.send(data))
      .catch(next);
  });
