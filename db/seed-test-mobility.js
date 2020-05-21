require('dotenv').config();

const mongoose = require('mongoose');
const connect = require('../lib/utils/connect');
const TestMobilityData = require('../lib/models/TestMobilityData');
const TestMobilityDataFile = require('../data/Global_Mobility_Report-sample-2.json');

connect();

const seedData = async() => {
  const data = await TestMobilityData.create(TestMobilityDataFile.map(({ 
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
      countryCode: country_region_code !== '' ? country_region_code : null,
      countryName: country_region !== '' ? country_region : null,
      subRegion1: sub_region_1 !== '' ? sub_region_1 : null,
      subRegion2: sub_region_2 !== '' ? sub_region_2 : null,
      retailChange: retail_and_recreation_percent_change_from_baseline !== '' ? retail_and_recreation_percent_change_from_baseline : null,
      groceryChange: grocery_and_pharmacy_percent_change_from_baseline !== '' ? grocery_and_pharmacy_percent_change_from_baseline : null,
      parksChange: parks_percent_change_from_baseline !== '' ? parks_percent_change_from_baseline : null, 
      transitChange: transit_stations_percent_change_from_baseline !== '' ? transit_stations_percent_change_from_baseline : null,
      workplacesChange: workplaces_percent_change_from_baseline !== '' ? workplaces_percent_change_from_baseline : null,
      residentialChange: residential_percent_change_from_baseline !== '' ? residential_percent_change_from_baseline : null,
    }
  )));

  return data;
};

seedData();
  // .then(result => console.log(result));
  // .then(mongoose.connection.close());

