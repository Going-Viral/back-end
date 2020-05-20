const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  // Originally date
  date: {
    type: String,
    required: true
  },
  // Originally country_region_code
  countryCode: {
    type: String,
    required: true
  },
  // Originally country_region
  countryName: {
    type: String,
  },
  // Originally subRegion1
  subRegion1: {
    type: String
  },
  // Originally sub_region_2
  subRegion2: {
    type: String
  },
  // Originally retail_and_recreation_percent_change_from_baseline
  retailChange: {
    type: Number
  },
  // Originally grocery_and_pharmacy_percent_change_from_baseline
  groceryChange: {
    type: Number
  },
  // Originally parks_percent_change_from_baseline
  parksChange: {
    type: Number
  },
  // Originally transit_stations_percent_change_from_baseline
  transitChange: {
    type: Number
  },
  // Originally workplaces_percent_change_from_baseline
  workplacesChange: {
    type: Number
  },
  // Originally residential_percent_change_from_baseline
  residentialChange: {
    type: Number
  }
});


module.exports = mongoose.model('MobilityData', schema);

