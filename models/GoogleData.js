const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  country_region_code: {
    type: String,
    required: true
  },
  country_region: {
    type: String,
    required: true
  },
  sub_region_1: {
    type: String,
    required: true
  },
  sub_region_2: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  retail_and_recreation_percent_change_from_baseline: {
    type: Number,
    required: true
  },
  grocery_and_pharmacy_percent_change_from_baseline: {
    type: Number,
    required: true
  },
  parks_percent_change_from_baseline: {
    type: Number,
    required: true
  },
  transit_stations_percent_change_from_baseline: {
    type: Number,
    required: true
  },
  workplaces_percent_change_from_baseline: {
    type: Number,
    required: true
  },
  residential_percent_change_from_baseline: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('GoogleData', schema);
