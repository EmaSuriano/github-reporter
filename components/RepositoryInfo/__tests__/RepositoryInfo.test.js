import React from 'react';
import { mount } from 'enzyme';
import { MockedProvider } from 'react-apollo/test-utils';
import wait from 'waait';

import RepositoryInfo from '../RepositoryInfo';
import { GET_REPOSITORIES_INFORMATION } from '../query';

import mockedQueryResponse from './fixtures/query-mock';
import mockedQueryResponseWithNextPage from './fixtures/query-mock-with-next-page';

const variables = { name: 'wesbos', id: 'MDQ6VXNlcjMzOTk0Mjk=' };

const querySuccess = [
  {
    request: {
      query: GET_REPOSITORIES_INFORMATION,
      variables,
    },
    result: {
      data: mockedQueryResponse,
    },
  },
];

const queryErrorMock = {
  request: {
    query: GET_REPOSITORIES_INFORMATION,
    variables,
  },
  error: new Error('Query Error'),
};

const queryFirstPage = [
  {
    request: {
      query: GET_REPOSITORIES_INFORMATION,
      variables: { ...variables, endCursor: 'Y3Vyc29yOnYyOpIAzgIGNAs=' },
    },
    result: {
      data: mockedQueryResponseWithNextPage,
    },
  },
];

describe('Repository Info Component', () => {
  describe('render', () => {
    let wrapper;

    describe("when it's loading", () => {
      let className, color, loading, margin, size, sizeUnit, spinner;

      beforeAll(() => {
        wrapper = mount(
          <MockedProvider mocks={[]}>
            <RepositoryInfo />
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
          <MockedProvider mocks={[queryErrorMock]} addTypename={false}>
            <RepositoryInfo login="wesbos" id="124345343" />
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

    describe('when it has successfull response', () => {
      describe('and has one page', () => {
        let main;

        beforeAll(async () => {
          wrapper = mount(
            <MockedProvider mocks={querySuccess}>
              <RepositoryInfo login="wesbos" id="MDQ6VXNlcjMzOTk0Mjk=" />
            </MockedProvider>,
          );

          await wait();
          wrapper.update();

          main = wrapper.find('.content--container');
        });

        it('should render repository info', () => expect(main).toMatchSnapshot());
      });

      describe('and has more than one page', () => {
        let main;

        beforeAll(async () => {
          wrapper = mount(
            <MockedProvider mocks={[...queryFirstPage, ...querySuccess]}>
              <RepositoryInfo login="wesbos" id="MDQ6VXNlcjMzOTk0Mjk=" />
            </MockedProvider>,
          );

          await wait();
          wrapper.update();

          main = wrapper.find('.content--container');
        });

        it('should render repository info', () => expect(main).toMatchSnapshot());
      });
    });
  });
});
