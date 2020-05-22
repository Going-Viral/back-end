require('dotenv').config();

const mongoose = require('mongoose');
const connect = require('../lib/utils/connect');
const orNull = require('../lib/utils/utils');
const TestCovidData = require('../lib/models/TestCovidData');
const TestCovidDataFile = require('../data/Test-Bing-COVID19-Data.json');

connect();

const seedData = () => {
  return TestCovidData.create(TestCovidDataFile.map(({ 
    ID, 
    Updated, 
    Confirmed, 
    ConfirmedChange, 
    Deaths, 
    DeathsChange, 
    Recovered, 
    RecoveredChange, 
    Latitude, 
    Longitude, 
    ISO2, 
    ISO3, 
    Country_Region, 
    AdminRegion1, 
    AdminRegion2 
  }) => (
    {
      id: ID,
      date: Updated,
      countryCode: orNull(ISO2),
      countryName: orNull(Country_Region),
      subRegion1: orNull(AdminRegion1),
      subRegion2: orNull(AdminRegion2),
      latitude: orNull(Latitude),
      longitude: orNull(Longitude),
      totalCases: orNull(Confirmed),
      newCases: orNull(ConfirmedChange),
      totalDeaths: orNull(Deaths),
      newDeaths: orNull(DeathsChange), 
      totalRecovered: orNull(Recovered),
      newRecovered: orNull(RecoveredChange),
    }
  )));
};

seedData()
  .then(result => console.log(result))
  .then(() => mongoose.connection.close());


// NOTES: 
// • Expand memory allocated to node process to complete processing of large JSON document:
//   node --max-old-space-size=8192 ./db/seed-google.js 
// • Extend mongoose's timeout window so MongoDB won't disconnect before JSON conversion completes:
//   see mongoose.connect parameters
// • Use https://www.npmjs.com/package/csv2json to convert large CSVs to JSON: 
//   csv2json -d <inputFilename>.csv <outputFilename>.json
