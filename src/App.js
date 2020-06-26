import * as React from 'react';
import { GraphQLClient, ClientContext } from 'graphql-hooks';
import memCache from 'graphql-hooks-memcache';
import { createGlobalStyle } from 'styled-components';
import Mark from './Mark';

const GlobalStyle = createGlobalStyle`
  html, body {
    padding: 0;
    margin: 0;
    min-height: 100vh;
    min-width: 100vh;
    overflow-x: hidden;
  }
`;

const GQL_URL = process.env.NODE_ENV === 'production' ? '/.netlify/functions/hub' : '/dev/graphql';

const client = new GraphQLClient({
    url: GQL_URL,
    cache: memCache(),
});

function App() {
    return (
        <>
            <ClientContext.Provider value={client}>
                <Mark />
            </ClientContext.Provider>
            <GlobalStyle />
        </>
    );
}

export default App;
