import * as React from 'react';
import { GraphQLClient, ClientContext } from 'graphql-hooks';
import Mark from './Mark';

const GQL_URL = process.env.NODE_ENV === 'production' ? '/.netlify/functions/hub' : '/dev/graphql';

const client = new GraphQLClient({
    url: GQL_URL,
});

function App() {
    return (
        <ClientContext.Provider value={client}>
            <Mark />
        </ClientContext.Provider>
    );
}

export default App;
