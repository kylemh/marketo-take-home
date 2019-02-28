import addLeadToList from '../addLeadToList';

const someLead = {
  _id: 'jkj238238jdsnfsj23',
  email: 'foo@bar.com',
  firstName: 'John',
  lastName: 'Smith',
  address: '123 Street St',
  entryDate: '2014-05-07T17:30:20+00:00',
};

describe('addLeadToList', () => {
  it('should update passed array and set', () => {
    const anInitiallyEmptyArray = [];
    const anInitiallyEmptySet = new Set();
    addLeadToList(someLead, anInitiallyEmptyArray, anInitiallyEmptySet);

    expect(anInitiallyEmptyArray).toContain(someLead);
    expect(anInitiallyEmptySet).toContain(someLead.email);
    expect(anInitiallyEmptySet).toContain(someLead._id);
  });

  it('should push to new lead to top of passed array', () => {
    const someArrayOfLeads = [
      {
        _id: 'hjk4b23hj423kh4429',
        email: 'mae@bae.com',
        firstName: 'Michael',
        lastName: 'Lawsom',
        address: '123 Street Avenue',
        entryDate: '2014-05-10T17:30:20+00:00',
      },
      {
        _id: 'wabaj238238jdsnfsj23',
        email: 'bog@bar.com',
        firstName: 'Fran',
        lastName: 'Jones',
        address: '8803 Dark St',
        entryDate: '2014-05-07T17:31:20+00:00',
      },
    ];

    addLeadToList(someLead, someArrayOfLeads, new Set());

    const topOfArray = someArrayOfLeads.length - 1;

    expect(someArrayOfLeads[topOfArray]).toStrictEqual(someLead);
  });
});
