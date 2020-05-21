const { Router } = require('express');
const MobilityData = require('../models/MobilityData');


module.exports = Router()
  // global map fetch
  .get('/', (req, res, next) => {
    MobilityData
      .find()
      .then(country => res.send(country))
      .catch(next);
  });
