import React from 'react';
import { shallow } from 'enzyme';
import NumberOfEvents from '../NumberOfEvents';

describe('<NumberofEvents /> component', () => {

  test('render the number of events menu', () => {
    const numberFilter = shallow(<NumberOfEvents />);
    expect(numberFilter.find('.NumberOfEvents')).toHaveLength(1);
  });

  
});