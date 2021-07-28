/* eslint-disable import/prefer-default-export */
import {
  ApolloClient, ApolloLink, InMemoryCache, HttpLink,
} from '@apollo/client';

const httpLink = new HttpLink({

  uri: 'http://localhost:3001/api',

});

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([httpLink]),
});
