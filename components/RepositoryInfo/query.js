import { gql } from 'apollo-boost';

export const GET_REPOSITORIES_INFORMATION = gql`
  query($name: String!, $id: ID!, $cursor: String) {
    user(login: $name) {
      id
      repositories(
        orderBy: { direction: DESC, field: STARGAZERS }
        affiliations: [OWNER]
        first: 100
        after: $cursor
        ownerAffiliations: OWNER
      ) {
        pageInfo {
          hasNextPage
          endCursor
        }
        edges {
          node {
            name
            isFork
            primaryLanguage {
              name
              color
            }
            stargazers {
              totalCount
            }
            masterBranch: ref(qualifiedName: "master") {
              target {
                ... on Commit {
                  history(first: 0, author: { id: $id }) {
                    totalCount
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
