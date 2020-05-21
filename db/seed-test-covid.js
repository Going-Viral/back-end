require('dotenv').config();

const mongoose = require('mongoose');
const connect = require('../lib/utils/connect');
const TestCovidData = require('../models/TestCovidData');
const TestCovidDataFile = require('../data/Test-Bing-COVID19-Data.json');

connect();

const seedData = async() => {
  const data = await TestCovidData.create(TestCovidDataFile.map(({ 
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
      countryCode: ISO2 !== '' ? ISO2 : null,
      countryName: Country_Region !== '' ? Country_Region : null,
      subRegion1: AdminRegion1 !== '' ? AdminRegion1 : null,
      subRegion2: AdminRegion2 !== '' ? AdminRegion2 : null,
      latitude: Latitude !== '' ? Latitude : null,
      longitude: Longitude !== '' ? Longitude : null,
      totalCases: Confirmed !== '' ? Confirmed : null,
      newCases: ConfirmedChange !== '' ? ConfirmedChange : null,
      totalDeaths: Deaths !== '' ? Deaths : null,
      newDeaths: DeathsChange !== '' ? DeathsChange : null, 
      totalRecovered: Recovered !== '' ? Recovered : null,
      newRecovered: RecoveredChange !== '' ? RecoveredChange : null,
    }
  )));

  return data;
};

seedData();
  // .then(result => console.log(result));
  // .then(mongoose.connection.close());


// NOTES: 
// • Expand memory allocated to node process to complete processing of large JSON document:
//   node --max-old-space-size=8192 ./db/seed-google.js 
// • Extend mongoose's timeout window so MongoDB won't disconnect before JSON conversion completes:
//   see mongoose.connect parameters
// • Use https://www.npmjs.com/package/csv2json to convert large CSVs to JSON: 
//   csv2json -d <inputFilename>.csv <outputFilename>.json
