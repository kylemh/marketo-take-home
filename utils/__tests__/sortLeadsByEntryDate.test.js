import { leads } from '../../inputs/leads.json';
import { leads as allDupeLeads } from '../../inputs/all_dupes_same_entry.json';
import sortLeadsByEntryDate from '../sortLeadsByEntryDate';

describe('sortLeadsByEntryDate', () => {
  it('should sort as expected with differing leads', () => {
    const someLeads = leads.slice(0, 3);
    const result = sortLeadsByEntryDate(someLeads);

    expect(result).toStrictEqual([
      {
        _id: 'edu45238jdsnfsj23',
        email: 'mae@bar.com',
        firstName: 'Ted',
        lastName: 'Masters',
        address: '44 North Hampton St',
        entryDate: '2014-05-07T17:31:20+00:00',
      },
      {
        _id: 'wabaj238238jdsnfsj23',
        email: 'bog@bar.com',
        firstName: 'Fran',
        lastName: 'Jones',
        address: '8803 Dark St',
        entryDate: '2014-05-07T17:31:20+00:00',
      },
      {
        _id: 'jkj238238jdsnfsj23',
        email: 'foo@bar.com',
        firstName: 'John',
        lastName: 'Smith',
        address: '123 Street St',
        entryDate: '2014-05-07T17:30:20+00:00',
      },
    ]);
  });

  it('should not change an array of entirely dupes with the same entryDate', () => {
    const someLeads = allDupeLeads.slice(0, 3);
    const result = sortLeadsByEntryDate(someLeads);

    expect(result).toStrictEqual(someLeads);
  });
});
