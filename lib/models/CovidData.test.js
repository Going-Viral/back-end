const mongoose = require('mongoose');
const CovidData = require('./TestCovidData');

describe('CovidData model', () => {
  it('has a required id', () => {
    const covidData = new CovidData();
    const { errors } = covidData.validateSync();

    expect(errors.id.message).toEqual('Path `id` is required.');
  });

  it('has all required fields', () => {
    const covidData = new CovidData({
      id: 78349278340,
      date: '3/15/2020',
      latitude: '43.073051',
      longitude: '-89.401230',
      countryCode: 'US'
    });

    expect(covidData.toJSON()).toEqual({
      _id: expect.any(mongoose.Types.ObjectId),
      id: 78349278340,
      date: expect.any(Date),
      latitude: '43.073051',
      longitude: '-89.401230',
      countryCode: 'US'
    });
  });
});
