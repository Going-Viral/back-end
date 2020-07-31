require('dotenv').config();

const mongoose = require('mongoose');
const connect = require('../lib/utils/connect');
const orNull = require('../lib/utils/utils');
const CovidData = require('../lib/models/CovidData');
const CovidDataFile = require('../data/Bing-COVID19-Data_0528.json');

connect();

// range included: 1/21 - 5/26
// db has: 1/21 - 5/09
// renge needed: 2/15 - 5/21

const firstDate = new Date('05/09/2020');
const lastDate = new Date('05/22/2020');

const seedData = () => {
  return CovidData.create(CovidDataFile.filter(({ Updated }) => new Date(Updated) > firstDate && new Date(Updated) < lastDate).map(({ 
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
  .then(() => mongoose.connection.close());
