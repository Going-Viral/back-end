const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  totalCases: {
    type: String
  },
  newCases: {
    type: String
  },
  totalDeaths: {
    type: String
  },
  newDeaths: {
    type: String
  },
  totalRecovered: {
    type: String
  },
  newRecovered: {
    type: String
  },
  latitude: {
    type: String,
    required: true
  },
  longitude: {
    type: String,
    required: true
  },
  ISO2: {
    type: String
  },
  ISO3: {
    type: String
  },
  countryRegion: {
    type: String
  },
  subRegion1: {
    type: String
  },
  subRegion2: {
    type: String
  }
});

module.exports = mongoose.model('CovidData', schema);
