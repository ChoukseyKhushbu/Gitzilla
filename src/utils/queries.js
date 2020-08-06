
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
query searchRepos($username: String!) {
  user(login: $username) {
    repositories(last: 100, orderBy: {field: UPDATED_AT, direction: DESC}) {
      nodes {
        name
        description
        projectsUrl
        languages(last: 5) {
          nodes {
            name
          }
        }
      }
    }
  }
}
`;