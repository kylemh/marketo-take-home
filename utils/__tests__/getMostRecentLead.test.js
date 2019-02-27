import { getMostRecentLead } from '../';

describe('getMostRecentLead', () => {
  it('should throw system error if not passed an array', () => {
    expect(() => getMostRecentLead()).toThrowError(
      `TypeError: Cannot read property 'length' of undefined`,
    );
  });

  it('should throw an error if passed an empty array', () => {
    expect(() => getMostRecentLead([])).toThrowError(
      'Must pass an array of leads to this function',
    );
  });

  it('should return the first item when passed a one-item array', () => {
    expect(getMostRecentLead([{ test: 'test' }]));
  });
});
