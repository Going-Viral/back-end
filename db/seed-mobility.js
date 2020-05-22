require('dotenv').config();

const mongoose = require('mongoose');
const connect = require('../lib/utils/connect');
const orNull = require('../lib/utils/utils');
const MobilityData = require('../lib/models/MobilityData');
const MobilityDataFile = require('../data_gitignore/Global_Mobility_Report_v2.json');

connect();

const seedData = () => {
  return MobilityData.create(MobilityDataFile.map(({ 
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
  .then(() => mongoose.connection.close());


// NOTES: 
// • Expand memory allocated to node process to complete processing of large JSON document:
//   node --max-old-space-size=8192 ./db/seed-google.js 
// • Extend mongoose's timeout window so MongoDB won't disconnect before JSON conversion completes:
//   see mongoose.connect parameters
// • Use https://www.npmjs.com/package/csv2json to convert large CSVs to JSON: 
//   csv2json -d <inputFilename>.csv <outputFilename>.json
