import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

// Create a link to your GraphQL server
const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URL, // <-- REQUIRED
  credentials: 'same-origin', // optional
});

const client = new ApolloClient({
    uri: "/api/graphql", // GraphQL API endpoint
    cache: new InMemoryCache()
});

export default client;