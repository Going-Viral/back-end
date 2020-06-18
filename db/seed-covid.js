require('dotenv').config();

const mongoose = require('mongoose');
const connect = require('../lib/utils/connect');
const { orNull } = require('../lib/utils/utils');
const CovidData = require('../lib/models/CovidData');
const CovidDataFile = require('../data_gitignore/Bing-COVID19-Data_0616.json');

connect();

// Set date range to match Mobility data set
const inDateRange = (num) => {
  if(!num) return false;
  else {
    const thisDate = Number(num.slice(0, 2) + num.slice(3, 5));
    return (thisDate >= 215 && thisDate <= 612);
  }
};

const seedDataInChunks = async(dataFile) => {
  const start = new Date();
  let lap = start;
  let totalRecords = 0;
  const chunkSize = 50000;
  const totalChunks = Math.ceil(dataFile.length / chunkSize);
  
  console.log(`Processing ${dataFile.length} records in ${totalChunks} batches...`);

  for(let count = 1; count <= totalChunks; count++) {
    const lowerThreshold = count * chunkSize - chunkSize;
    const upperThreshold = (count * chunkSize < dataFile.length) ? count * chunkSize : dataFile.length;
    const dataChunk = dataFile.filter((item, index) => index >= lowerThreshold && index < upperThreshold && inDateRange(item.Updated));
    await seedData(dataChunk);
    const end = new Date();
    const lapTime = (end - lap) / 1000;
    const totalTime = (end - start) / 1000;
    console.log(`Batch ${count} | Adding ${dataChunk.length} records from range ${lowerThreshold}-${upperThreshold - 1} | ${lapTime}s | ${totalTime}s elapsed`); 
    lap = end;
    totalRecords += dataChunk.length;
  }
  return totalRecords;
};

const seedData = (data) => {
  return CovidData.create(data.map(({ 
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
    Country_Region, 
    AdminRegion1, 
    AdminRegion2 
  }) => (
    {
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

seedDataInChunks(CovidDataFile)
  .then(total => console.log(`Added ${total} out of ${CovidDataFile.length} records.`))
  .then(() => mongoose.connection.close());


// NOTES: 
// • Expand memory allocated to node process to complete processing of large JSON document:
//   node --max-old-space-size=8192 ./db/seed-google.js 
// • Extend mongoose's timeout window so MongoDB won't disconnect before JSON conversion completes:
//   see mongoose.connect parameters
// • Use https://www.npmjs.com/package/csv2json to convert large CSVs to JSON: 
//   csv2json -d <inputFilename>.csv <outputFilename>.json
