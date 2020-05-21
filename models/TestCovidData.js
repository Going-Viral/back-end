const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  // Originally ID
  id: {
    type: Number,
    required: true
  },
  // Originally Updated
  date: {
    type: Date,
    required: true
  },
  // Originally Confirmed
  totalCases: {
    type: Number
  },
  // Originally ComfirmedChange
  newCases: {
    type: Number
  },
  // Originally Deaths
  totalDeaths: {
    type: Number
  },
  // Originally DeathsChange
  newDeaths: {
    type: Number
  },
  // Originally Recovered
  totalRecovered: {
    type: Number
  },
  // Originally RecoveredChange
  newRecovered: {
    type: Number
  },
  // Originally Latitude
  latitude: {
    type: Number
  },
  // Originally Longitude
  longitude: {
    type: Number
  },
  // Originally ISO2
  countryCode: {
    type: String
  },
  // Originally ISO3
  ISO3: {
    type: String
  },
  // Originally Country_Region
  countryName: {
    type: String
  },
  // Originally AdminRegion1
  subRegion1: {
    type: String
  },
  // Originally AdminRegion2
  subRegion2: {
    type: String
  }
});

module.exports = mongoose.model('TestCovidData', schema);
