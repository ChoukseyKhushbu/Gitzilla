export const searchUserQuery = `
query searchUser($username: String!) {
  user(login: $username) {
    avatarUrl
    name
    url
    login
    bio
    websiteUrl
    location
    company
    following {
        totalCount
    }
    followers {
        totalCount
    }
  }
}
`;

export const searchRepoQuery = `
query searchRepos($username: String!,$after:String) {
  user(login: $username) {
    repositories(orderBy: {field: UPDATED_AT, direction: DESC}, first: 30, after: $after) {
      nodes {
        id
        name
        description
        url
        isFork
        languages(first: 5) {
          nodes {
            name
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
      totalCount
    }
  }
}
`;
