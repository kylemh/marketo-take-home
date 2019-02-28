import { leads } from '../../../../inputs/leads.json';
import { leads as allDupeLeads } from '../../../../inputs/all_dupes_same_entry.json';
import { leads as allUniqueLeads } from '../../../../inputs/all_unique.json';
import dedupeLeads from '../dedupeLeads';

describe('dedupeLeads', () => {
  it('should return two empty arrays in an object when passed an empty array', () => {
    const { dedupedLeads, removedLeads } = dedupeLeads([]);
    expect(dedupedLeads).toStrictEqual([]);
    expect(removedLeads).toStrictEqual([]);
  });

  it('should return expected leads as deduped or removed with sample leads', () => {
    const { dedupedLeads, removedLeads } = dedupeLeads(leads);
    expect(dedupedLeads).toStrictEqual([
      {
        _id: 'vug789238jdsnfsj23',
        email: 'foo1@bar.com',
        firstName: 'Blake',
        lastName: 'Douglas',
        address: '123 Reach St',
        entryDate: '2014-05-07T17:33:20+00:00',
      },
      {
        _id: 'wuj08238jdsnfsj23',
        email: 'foo@bar.com',
        firstName: 'Micah',
        lastName: 'Valmer',
        address: '123 Street St',
        entryDate: '2014-05-07T17:33:20+00:00',
      },
      {
        _id: 'belr28238jdsnfsj23',
        email: 'mae@bar.com',
        firstName: 'Tallulah',
        lastName: 'Smith',
        address: '123 Water St',
        entryDate: '2014-05-07T17:33:20+00:00',
      },
      {
        _id: 'jkj238238jdsnfsj23',
        email: 'bill@bar.com',
        firstName: 'John',
        lastName: 'Smith',
        address: '888 Mayberry St',
        entryDate: '2014-05-07T17:33:20+00:00',
      },
      {
        _id: 'wabaj238238jdsnfsj23',
        email: 'bog@bar.com',
        firstName: 'Fran',
        lastName: 'Jones',
        address: '8803 Dark St',
        entryDate: '2014-05-07T17:31:20+00:00',
      },
    ]);

    expect(removedLeads).toStrictEqual([
      {
        _id: 'jkj238238jdsnfsj23',
        email: 'foo@bar.com',
        firstName: 'John',
        lastName: 'Smith',
        address: '123 Street St',
        entryDate: '2014-05-07T17:30:20+00:00',
      },
      {
        _id: 'edu45238jdsnfsj23',
        email: 'mae@bar.com',
        firstName: 'Ted',
        lastName: 'Masters',
        address: '44 North Hampton St',
        entryDate: '2014-05-07T17:31:20+00:00',
      },
      {
        _id: 'jkj238238jdsnfsj23',
        email: 'coo@bar.com',
        firstName: 'Ted',
        lastName: 'Jones',
        address: '456 Neat St',
        entryDate: '2014-05-07T17:32:20+00:00',
      },
      {
        _id: 'sel045238jdsnfsj23',
        email: 'foo@bar.com',
        firstName: 'John',
        lastName: 'Smith',
        address: '123 Street St',
        entryDate: '2014-05-07T17:32:20+00:00',
      },
      {
        _id: 'qest38238jdsnfsj23',
        email: 'foo@bar.com',
        firstName: 'John',
        lastName: 'Smith',
        address: '123 Street St',
        entryDate: '2014-05-07T17:32:20+00:00',
      },
    ]);
  });

  it('should return the first lead if every lead is the same', () => {
    const { dedupedLeads, removedLeads } = dedupeLeads(allDupeLeads);

    expect(dedupedLeads.length).toStrictEqual(1);
    expect(removedLeads.length).toStrictEqual(allDupeLeads.length - 1);
    expect(dedupedLeads[0]).toStrictEqual(allDupeLeads[0]);
  });

  it('should return the array entirely within dedupedLeads if only unique leads passed', () => {
    const smallSampleOfUniqueLeads = allUniqueLeads.slice(0, 4);
    const { dedupedLeads, removedLeads } = dedupeLeads(smallSampleOfUniqueLeads);

    expect(removedLeads).toStrictEqual([]);
    smallSampleOfUniqueLeads.forEach((uniqueLead) => {
      expect(dedupedLeads).toContainEqual(uniqueLead);
    });
  });
});
