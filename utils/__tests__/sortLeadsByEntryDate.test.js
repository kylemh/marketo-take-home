import sortLeadsByEntryDate from '../sortLeadsByEntryDate';

describe('sortLeadsByEntryDate', () => {
  it('should return true', () => {
    expect(typeof sortLeadsByEntryDate).toStrictEqual('function');
  });
});
