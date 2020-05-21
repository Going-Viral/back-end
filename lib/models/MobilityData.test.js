const mongoose = require('mongoose');
const MobilityData = require('./MobilityData');

describe('MobilityData model', () => {
  it('has a required date', () => {
    const mobilityData = new MobilityData();
    const { errors } = mobilityData.validateSync();

    expect(errors.date.message).toEqual('Path `date` is required.');
  });

  it('has all required fields', () => {
    const mobilityData = new MobilityData({
      date: '3/15/2020',
      countryCode: 'US'
    });

    expect(mobilityData.toJSON()).toEqual({
      _id: expect.any(mongoose.Types.ObjectId),
      date: '3/15/2020',
      countryCode: 'US'
    });
  });
});
