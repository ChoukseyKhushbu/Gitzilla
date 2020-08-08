import { GraphQLClient } from 'graphql-request'

export const graphqlClient = new GraphQLClient('https://api.github.com/graphql', {
    headers: {
        Authorization: `Bearer ${process.env.REACT_APP_GITHUB_TOKEN}`,
    },
    method: 'POST',
});