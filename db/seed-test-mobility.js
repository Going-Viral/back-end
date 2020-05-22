require('dotenv').config();

const mongoose = require('mongoose');
const connect = require('../lib/utils/connect');
const orNull = require('../lib/utils/utils');
const TestMobilityData = require('../lib/models/TestMobilityData');
const TestMobilityDataFile = require('../data/Test-Global_Mobility_Report-sample.json');

connect();

const seedData = () => {
  return TestMobilityData.create(TestMobilityDataFile.map(({ 
    country_region_code,
    country_region,
    sub_region_1,
    sub_region_2,
    date,
    retail_and_recreation_percent_change_from_baseline,
    grocery_and_pharmacy_percent_change_from_baseline,
    parks_percent_change_from_baseline,
    transit_stations_percent_change_from_baseline,
    workplaces_percent_change_from_baseline,
    residential_percent_change_from_baseline
  }) => (
    {
      date: date,
      countryCode: orNull(country_region_code),
      countryName: orNull(country_region),
      subRegion1: orNull(sub_region_1),
      subRegion2: orNull(sub_region_2),
      retailChange: orNull(retail_and_recreation_percent_change_from_baseline),
      groceryChange: orNull(grocery_and_pharmacy_percent_change_from_baseline),
      parksChange: orNull(parks_percent_change_from_baseline), 
      transitChange: orNull(transit_stations_percent_change_from_baseline),
      workplacesChange: orNull(workplaces_percent_change_from_baseline),
      residentialChange: orNull(residential_percent_change_from_baseline)
    }
  )));
};

seedData()
  .then(result => console.log(result))
  .finally(() => mongoose.connection.close());
