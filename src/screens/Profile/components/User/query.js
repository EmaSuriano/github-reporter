import { gql } from "apollo-boost";

export const PROFILE_INFO = gql`
  query($name: String!) {
    user(login: $name) {
      avatarUrl
      bio
      company
      createdAt
      email
      id
      location
      login
      name
      followers {
        totalCount
      }
      following {
        totalCount
      }
      pinnedRepositories {
        totalCount
      }
      repositories(first: 0, affiliations: [OWNER]) {
        totalCount
      }
      starredRepositories {
        totalCount
      }
    }
  }
`;
