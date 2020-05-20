const mongoose = require('mongoose');
const CovidData = require('./CovidData');

describe('CovidData model', () => {
  it('has a required id', () => {
    const covidData = new CovidData();
    const { errors } = covidData.validateSync();

    expect(errors.id.message).toEqual('Path `id` is required.');
  });

  it('has all required fields', () => {
    const covidData = new CovidData({
      id: '43jkj4k32',
      date: '3/15/2020',
      latitude: '43.073051',
      longitude: '-89.401230'
    });

    expect(covidData.toJSON()).toEqual({
      _id: expect.any(mongoose.Types.ObjectId),
      id: '43jkj4k32',
      date: '3/15/2020',
      latitude: '43.073051',
      longitude: '-89.401230'
    });
  });
});
