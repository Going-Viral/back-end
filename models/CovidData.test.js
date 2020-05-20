const mongoose = require('mongoose');
const CovidData = require('./CovidData');

describe('CovidData model', () => {
  it('has a required id', () => {
    const covidData = new CovidData();
    const { errors } = covidData.validateSync();

    expect(errors.id.message).toEqual('Path `id` is required.');
  });
});
