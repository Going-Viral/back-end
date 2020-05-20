require('dotenv').config();

const connect = require('../lib/utils/connect');
const CovidData = require('../models/CovidData');
const CovidDataFile = require('../data/Bing-COVID19-Data-sample.json');

connect();

CovidData.create([...Array(CovidDataFile)].map(({ 
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
    totalCases: Confirmed,
    newCases: ConfirmedChange,
    totalDeaths: Deaths,
    newDeaths: DeathsChange, 
    totalRecovered: Recovered,
    newRecovered: RecoveredChange,
    latitude: Latitude,
    longitude: Longitude,
    ISO2: ISO2,
    ISO3: ISO3,
    countryRegion: Country_Region,
    subRegion1: AdminRegion1,
    subRegion2: AdminRegion2
  }
)));
