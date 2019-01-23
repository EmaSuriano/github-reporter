import { concat, isEmpty } from 'ramda';
import { getEdges, getPageInfo, updateRepositoryData } from '../../utils';

const updateQuery = (previousResult, { fetchMoreResult }) => {
  const newEdges = getEdges(fetchMoreResult);
  if (isEmpty(newEdges)) return previousResult;

  const oldEdges = getEdges(previousResult);
  const pageInfo = getPageInfo(fetchMoreResult);
  const edges = concat(oldEdges, newEdges);
  const updatedData = updateRepositoryData(previousResult, edges, pageInfo);

  return updatedData;
};

export default updateQuery;
