import React from 'react';
import { shallow } from 'enzyme';

import Sidebar from '../Sidebar';

describe('Sidebar', () => {
  let wrapper;

  const props = {
    avatar: 'Avatar',
    bio: 'Biography',
    followers: 40,
    following: 22,
    name: 'Kyle Simpson',
  };

  beforeEach(() => {
    wrapper = shallow(<Sidebar {...props} />);
  });

  describe('render', () => {
    it('should match with html structure of the snapshot', () => expect(wrapper).toMatchSnapshot());
  });
});
