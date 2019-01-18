import { filter, gt, isNil, not, path, pathOr, subtract } from 'ramda';

const getDirection = size => (['xsmall', 'small'].includes(size) ? 'column' : 'row');

const removeEmpties = (data = []) => filter(value => value !== 0, data);

const removeLowerThan = (statistics, param, x) => key => {
  const currentParam = path([key, param], statistics);
  return not(isNil(currentParam)) || gt(currentParam, x);
};

const sortingByParam = (statistics, param) => (a, b) =>
  subtract(pathOr(0, [b, param], statistics), pathOr(0, [a, param], statistics));

const transformStatistics = (statistics = {}) => (accumulator, key) => ({
  ...accumulator,
  [key]: { ...statistics[key] },
});

export { getDirection, removeEmpties, removeLowerThan, sortingByParam, transformStatistics };
