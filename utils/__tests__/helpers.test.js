import { removeEmpties, removeLowerThan, sortingByParam, transformStatistics } from '../helpers';

describe('Helper Functions', () => {
  describe('removeEmpties', () => {
    let result;

    describe('when it is an array', () => {
      beforeEach(() => {
        const values = [1, 0, 4, 2, 0];
        result = removeEmpties(values);
      });

      it('should return an array of values without zeros', () => expect(result).toEqual([1, 4, 2]));
    });

    describe('when its an invalid param', () => {
      beforeEach(() => {
        result = removeEmpties();
      });

      it('should return an empty array', () => expect(result).toEqual([]));
    });
  });

  describe('removeLowerThan', () => {
    let result;

    describe('when parameter does not exist', () => {
      beforeEach(() => {
        const statistics = {
          redux: {},
        };
        result = removeLowerThan('redux')(statistics, 'commits', 0);
      });

      it('should return false', () => expect(result).toBeFalsy());
    });
  });

  describe('sortingByParam', () => {
    let result;

    describe('when parameter exists', () => {
      beforeEach(() => {
        const statistics = {
          PHP: { repositories: 9 },
          Ruby: { repositories: 7 },
        };
        const param = 'repositories';

        result = sortingByParam(statistics, param)('Ruby', 'PHP');
      });

      it('should return 2', () => expect(result).toEqual(2));
    });

    describe('when parameter does not exist', () => {
      beforeEach(() => {
        const statistics = {
          PHP: { repositories: 9 },
          Ruby: { repositories: 7 },
        };
        const param = 'commits';

        result = sortingByParam(statistics, param)('Ruby', 'PHP');
      });

      it('should return 0', () => expect(result).toEqual(0));
    });
  });

  describe('transformStatistics', () => {
    let result;

    describe('when statistics are not passed', () => {
      const accumulator = { PHP: { commits: 100, repositories: 40 } };
      const key = 'CSS';

      beforeEach(() => {
        result = transformStatistics()(accumulator, key);
      });

      it('should return accumulator with CSS as key and an empty object inside', () =>
        expect(result).toEqual({
          CSS: {},
          PHP: { commits: 100, repositories: 40 },
        }));
    });

    describe('when the key exists within statistics', () => {
      const statistics = { CSS: { commits: 10, repositories: 5 } };
      const accumulator = { JavaScript: { commits: 100, repositories: 40 } };
      const key = 'CSS';

      beforeEach(() => {
        result = transformStatistics(statistics)(accumulator, key);
      });

      it('should return the object with one more property', () =>
        expect(result).toEqual({
          CSS: { commits: 10, repositories: 5 },
          JavaScript: { commits: 100, repositories: 40 },
        }));
    });

    describe('when the key does not exist within statistics', () => {
      const statistics = { CSS: { commits: 10, repositories: 5 } };
      const accumulator = { JavaScript: { commits: 100, repositories: 40 } };
      const key = 'Ruby';

      beforeEach(() => {
        result = transformStatistics(statistics)(accumulator, key);
      });

      it('should return the object with an empty object inside the new key', () =>
        expect(result).toEqual({
          JavaScript: { commits: 100, repositories: 40 },
          Ruby: {},
        }));
    });
  });
});
