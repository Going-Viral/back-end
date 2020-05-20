require('dotenv').config();

const mongoose = require('mongoose');
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


// const posts = await Post.create([...Array(postsToCreate)].map(() => ({
//   user: chance.pickone(users)._id,
//   photoUrl: chance.url(),
//   caption: chance.sentence(),
//   tags: [chance.word(), chance.word()]
// })));


// totalCases: Confirmed !== '' ? Confirmed : null,
// newCases: ConfirmedChange !== '' ? ConfirmedChange : null,
// totalDeaths: Deaths !== '' ? Deaths : null,
// newDeaths: DeathsChange !== '' ? DeathsChange : null, 
// totalRecovered: Recovered !== '' ? Recovered : null,
// newRecovered: RecoveredChange !== '' ? RecoveredChange : null,
// latitude: Latitude !== '' ? Latitude : null,
// longitude: Longitude !== '' ? Longitude : null,
// ISO2: ISO2 !== '' ? ISO2 : null,
// ISO3: ISO3 !== '' ? ISO3 : null,
// countryRegion: Country_Region !== '' ? Country_Region : null,
// subRegion1: AdminRegion1 !== '' ? AdminRegion1 : null,
// subRegion2: AdminRegion2 !== '' ? AdminRegion2 : null,