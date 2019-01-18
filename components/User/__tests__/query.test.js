import { PROFILE_INFO } from '../query';

describe('Query', () => {
  it('should match with PROFILE_INFO Query', () => expect(PROFILE_INFO).toMatchSnapshot());
});
