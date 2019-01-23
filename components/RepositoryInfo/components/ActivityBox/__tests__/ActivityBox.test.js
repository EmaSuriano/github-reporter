import React from 'react';
import { shallow } from 'enzyme';

import ActivityBox from '../ActivityBox';

const props = {
  icon: <span>Icon</span>,
  stat: 5,
  title: 'Title',
};

describe('Activity Box Component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<ActivityBox {...props} />);
  });

  describe('render', () => {
    it('should be match with html structure of the snapshot', () =>
      expect(wrapper).toMatchSnapshot());
  });
});
