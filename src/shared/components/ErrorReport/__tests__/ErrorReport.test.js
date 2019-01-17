import React from 'react';
import { shallow } from 'enzyme';

import ErrorReport from '../ErrorReport';

describe('Error Report Component', () => {
  let wrapper;

  describe('when have a default property', () => {
    beforeEach(() => {
      wrapper = shallow(<ErrorReport />);
    });

    it('should render accordingly to the snapshot', () => expect(wrapper).toMatchSnapshot());
  });

  describe('when contains a defined property', () => {
    beforeEach(() => {
      wrapper = shallow(<ErrorReport description="Some Description" />);
    });

    it('should render accordingly to the snapshot', () => expect(wrapper).toMatchSnapshot());
  });
});
