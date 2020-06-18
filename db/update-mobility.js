require('dotenv').config();

const mongoose = require('mongoose');
const connect = require('../lib/utils/connect');
const fs = require('fs');
const { orNull } = require('../lib/utils/utils');
const MobilityData = require('../lib/models/MobilityData');
const MobilityDataFile = require('../data_gitignore/Global_Mobility_Report_0611.json');
connect();

const findEntry = (newMobilityEntry) => {
  return MobilityData
    .findOne({
      date: newMobilityEntry.date,
      countryCode: newMobilityEntry.countryCode,
      subRegion1: newMobilityEntry.subRegion1,
      subRegion2: newMobilityEntry.subRegion2
    });
};

const updateMobilityData = async() => {
  const start = new Date();
  let lap = start;
  console.log(`Processing ${MobilityDataFile.length} records.`);
  for(let i = 0; i < MobilityDataFile.length; i++) {
    const newMobilityEntry = {
      date: MobilityDataFile[i].date,
      countryCode: orNull(MobilityDataFile[i].country_region_code),
      countryName: orNull(MobilityDataFile[i].country_region),
      subRegion1: orNull(MobilityDataFile[i].sub_region_1),
      subRegion2: orNull(MobilityDataFile[i].sub_region_2),
      retailChange: orNull(MobilityDataFile[i].retail_and_recreation_percent_change_from_baseline),
      groceryChange: orNull(MobilityDataFile[i].grocery_and_pharmacy_percent_change_from_baseline),
      parksChange: orNull(MobilityDataFile[i].parks_percent_change_from_baseline), 
      transitChange: orNull(MobilityDataFile[i].transit_stations_percent_change_from_baseline),
      workplacesChange: orNull(MobilityDataFile[i].workplaces_percent_change_from_baseline),
      residentialChange: orNull(MobilityDataFile[i].residential_percent_change_from_baseline)
    };
    
    await findEntry(newMobilityEntry)
      // .then(data => console.log('Find results: ', data))
      .then(data => { 
        if(!data) { 
          console.log(`Object ${i} not found in database; writing to file.`);
          fs.appendFile('mobility-newEntries.json', JSON.stringify(newMobilityEntry) + '\n', function(err) {
            if(err) { console.log('Error: ', err); throw err; }
          });
        }
      })
      .catch(err => console.log('Error: ', err));
    
    if(i % 1000 === 0) {
      const end = new Date();
      const lapTime = (end - lap) / 1000;
      const totalTime = (end - start) / 1000;
      console.log(i, lapTime, totalTime); 
      lap = end;
    }
  }
};


updateMobilityData()
  .then(() => mongoose.connection.close());


// NOTES: 
// • Expand memory allocated to node process to complete processing of large JSON document:
//   node --max-old-space-size=8192 ./db/seed-google.js 
// • Extend mongoose's timeout window so MongoDB won't disconnect before JSON conversion completes:
//   see mongoose.connect parameters
// • Use https://www.npmjs.com/package/csv2json to convert large CSVs to JSON: 
//   csv2json -d <inputFilename>.csv <outputFilename>.json
