require('dotenv').config();

const mongoose = require('mongoose');
const connect = require('../lib/utils/connect');
const { orNull } = require('../lib/utils/utils');
const MobilityData = require('../lib/models/MobilityData');
const MobilityDataFile = require('../data_gitignore/Global_Mobility_Report_0615.json');

connect();

// Filter out certain high-count data segments (county data in certain states) to fit database within quota
const isWanted = (subRegion1, subRegion2) => {
  if((subRegion1 === 'Virginia' || subRegion1 === 'Kentucky' || subRegion1 === 'North Carolina' || subRegion1 === 'Missouri'  || subRegion1 === 'Nebraska') && subRegion2) return false;
  else return true;
};

// Make sure there are no date outliers
const inDateRange = (num) => {
  if(!num) return false;
  else {
    const thisDate = Number(num.slice(5, 7) + num.slice(8, 10));
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
    const dataChunk = dataFile.filter((item, index) => index >= lowerThreshold && index < upperThreshold && inDateRange(item.date) && isWanted(item.sub_region_1, item.sub_region_2));
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
  return MobilityData.create(data.map(({ 
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

seedDataInChunks(MobilityDataFile)
  .then(total => console.log(`Added ${total} out of ${MobilityDataFile.length} records.`))
  .then(() => mongoose.connection.close());


// NOTES: 
// • Expand memory allocated to node process to complete processing of large JSON document:
//   node --max-old-space-size=8192 ./db/seed-google.js 
// • Extend mongoose's timeout window so MongoDB won't disconnect before JSON conversion completes:
//   see mongoose.connect parameters
// • Use https://www.npmjs.com/package/csv2json to convert large CSVs to JSON: 
//   csv2json -d <inputFilename>.csv <outputFilename>.json
