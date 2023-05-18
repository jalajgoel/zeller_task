import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { createAuthLink } from 'aws-appsync-auth-link';

const httpLink = createHttpLink({
    uri: 'https://prrwjjssnvhpbcdwbcwx3nm3zm.appsync-api.ap-southeast-2.amazonaws.com/graphql',
  });

const authLink = createAuthLink({
    url: 'https://prrwjjssnvhpbcdwbcwx3nm3zm.appsync-api.ap-southeast-2.amazonaws.com/graphql',
    region: 'ap-southeast-2',
    auth: {
      type: 'API_KEY',
      apiKey: 'da2-psmv7fcrw5dlpmp5orner2xf7i',
    },
  });


  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  export default client;
