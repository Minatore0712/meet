import React from 'react';
import { shallow } from 'enzyme';
import EventList from '../EventList';
import Event from '../Event';
import { mockData } from '../mock-data';


describe('<EventList /> component', () => {

    test('render event list', () => {
      const EventListWrapper = shallow(<EventList events={mockData} />);
      expect(EventListWrapper.find(Event)).toHaveLength(mockData.length);
    });

    test('render show more button', () => {
      const createdEvent = shallow(<Event event={mockData[0]} />)
      expect(createdEvent.find('.details-btn')).toHaveLength(1);
    });
  

    test('event details expand on click', () => {
      const createdEvent = shallow(<Event event={mockData[0]} />)
      const changeState = createdEvent.state({showMore: false});
      createdEvent.find('.details-btn').simulate('click', changeState);
      expect(createdEvent.state('showMore')).toBe(false);
    })

    });

    