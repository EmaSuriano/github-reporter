import React from 'react';
import { mount } from 'enzyme';
import { MockedProvider } from 'react-apollo/test-utils';
import User from '../User';
import { PROFILE_INFO } from '../query';
import wait from 'waait';
import queryMock from './fixtures/query-mock';

const variables = { name: 'emasuriano' };

const queryErrorMock = [
  {
    request: {
      query: PROFILE_INFO,
      variables,
    },
    error: new Error('Query Error'),
  },
];

const queryMockWithData = [
  {
    request: {
      query: PROFILE_INFO,
      variables,
    },
    result: {
      data: queryMock,
    },
  },
];

describe('User Component', () => {
  describe('render', () => {
    let wrapper;

    describe("when it's loading", () => {
      let className, color, loading, margin, size, sizeUnit, spinner;

      beforeAll(() => {
        wrapper = mount(
          <MockedProvider mocks={[]} addTypename={false}>
            <User profile="emasuriano" />
          </MockedProvider>,
        );

        spinner = wrapper.find('Loader');
        ({ className, color, loading, margin, size, sizeUnit } = spinner.props());
      });

      it('should show a spinner', () => expect(spinner).toHaveLength(1));
      it('should have a "className" prop with "spinner" value', () =>
        expect(className).toBe('spinner'));
      it('should have a "color" prop with "#90C3FF" value', () => expect(color).toBe('#90C3FF'));
      it('should have a "loading" prop with "true" value', () => expect(loading).toBe(true));
      it('should have a "margin" prop with "1rem" value', () => expect(margin).toBe('1rem'));
      it('should have a "size" prop with "5" value', () => expect(size).toBe(5));
      it('should have a "sizeUnit" prop with "rem" value', () => expect(sizeUnit).toBe('rem'));
    });

    describe('when it has an error', () => {
      let error;

      beforeAll(async () => {
        wrapper = mount(
          <MockedProvider mocks={queryErrorMock} addTypename={false}>
            <User profile="emasuriano" />
          </MockedProvider>,
        );

        await wait(0);
        wrapper.update();

        error = wrapper.find('ErrorReport');
      });

      it('should display an "ErrorReport" componet', () => expect(error).toHaveLength(1));

      it('should has a default description for error', () =>
        expect(error.prop('description')).toBe('No results found'));
    });

    describe('without errors', () => {
      describe('when has just one page', () => {});

      describe('when has more than one page', () => {
        let main;

        beforeAll(async () => {
          wrapper = mount(
            <MockedProvider mocks={queryMockWithData}>
              <User profile="emasuriano" />
            </MockedProvider>,
          );

          await wait();
          wrapper.update();
          main = wrapper.find('section.profile--content');
        });

        it('should render full page', () => expect(main).toMatchSnapshot());
      });
    });
  });
});
