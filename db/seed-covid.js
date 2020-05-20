require('dotenv').config();

const mongoose = require('mongoose');
const connect = require('../lib/utils/connect');
const CovidData = require('../models/CovidData');
const CovidDataFile = require('../data/Bing-COVID19-Data-sample.json');

connect();

const seedData = async() => {
  const data = await CovidData.create(CovidDataFile.map(({ 
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

seedData()
  .then(result => console.log(result));
  // .then(mongoose.connection.close());
