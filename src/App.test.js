import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import App from './App';

function dedupeLeadsInUI(wrapper, leads) {
  const inputTextarea = wrapper.find('textarea[name="input"]');
  const json = JSON.stringify({ leads });

  inputTextarea.simulate('change', { target: { value: json } });

  wrapper.update();

  const button = wrapper.find('button');
  button.simulate('submit');
}

describe('App', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('should change the error message if input is empty and dedupe button is clicked', () => {
    const wrapper = mount(<App />);

    const button = wrapper.find('button');
    button.simulate('submit');

    wrapper.update();

    const errorBox = wrapper.find('.errorBox');
    expect(errorBox.text()).toStrictEqual(
      'The input must be valid JSON and include a key "leads" with an array as a value.',
    );
  });

  it('should change output to copy input if it is one lead', () => {
    const leads = [
      {
        _id: 'jkj238238jdsnfsj23',
        email: 'foo@bar.com',
        firstName: 'John',
        lastName: 'Smith',
        address: '123 Street St',
        entryDate: '2014-05-07T17:30:20+00:00',
      },
    ];

    const wrapper = mount(<App />);
    dedupeLeadsInUI(wrapper, leads);

    const outputTextArea = wrapper.find('textarea[name="output"]');
    expect(outputTextArea.text()).toStrictEqual(JSON.stringify({ leads }, undefined, 2));
  });

  it('should display event log after deduping leads with dupes', () => {
    const _id = 'jkj238238jdsnfsj23';

    const betterLead = {
      _id,
      email: 'yo@ya.com',
      firstName: 'Eldritch',
      lastName: 'Smacklebock',
      address: '123 Street Avenue',
      entryDate: '2014-06-07T17:30:20+00:00',
    };

    const worseLead = {
      _id,
      email: 'foo@bar.com',
      firstName: 'John',
      lastName: 'Smith',
      address: '123 Street St',
      entryDate: '2014-05-07T17:30:20+00:00',
    };

    const leadsWithDupes = [worseLead, betterLead];

    const wrapper = mount(<App />);

    dedupeLeadsInUI(wrapper, leadsWithDupes);

    expect(wrapper.find('.logArea').text()).toContain('Removed:');
    expect(wrapper.find('.logArea').text()).toContain(worseLead.firstName);
  });
});
