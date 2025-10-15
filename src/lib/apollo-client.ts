import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

// Sepolia endpoint
const sepoliaLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_SEPOLIA_GRAPH_URL || 'https://api.studio.thegraph.com/query/113713/p-2-pix/sepolia',
});

// Rootstock endpoint  
const rootstockLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_ROOTSTOCK_GRAPH_URL || 'https://api.studio.thegraph.com/query/113713/p-2-pix/1',
});

export const sepoliaClient = new ApolloClient({
  link: sepoliaLink,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      errorPolicy: 'ignore',
    },
    query: {
      errorPolicy: 'all',
    },
  },
});

export const rootstockClient = new ApolloClient({
  link: rootstockLink,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      errorPolicy: 'ignore',
    },
    query: {
      errorPolicy: 'all',
    },
  },
});

// Helper function to get client based on network
export const getClient = (network: 'sepolia' | 'rootstock') => {
  return network === 'sepolia' ? sepoliaClient : rootstockClient;
};
