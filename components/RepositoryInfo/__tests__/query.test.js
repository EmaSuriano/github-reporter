import { GET_REPOSITORIES_INFORMATION } from '../query';

describe('Query', () => {
  it('should match with the structure of GET_REPOSITORIES_INFORMATION Query', () =>
    expect(GET_REPOSITORIES_INFORMATION).toMatchSnapshot());
});
