import * as Recipe from './recipe';

import { ApolloServer, gql } from 'apollo-server-lambda';

import { RESTDataSource } from 'apollo-datasource-rest';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { mergeTypeDefs } from '@graphql-tools/merge';

const APOLLO_API_KEY = process.env.ENGINE_API_KEY;

const Profiles = {
    STACK_OVERFLOW: {
        platform: 'Stack Overflow',
        link: 'https://stackoverflow.com/users/4396258/mark',
    },
    GITHUB: {
        platform: 'GitHub',
        link: 'https://github.com/magicmark',
        username: 'magicmark',
    },
    TWITTER: {
        platform: 'Twitter',
        link: 'https://twitter.com/mark_larah',
        username: 'mark_larah',
    },
    LINKEDIN: {
        platform: 'LinkedIn',
        link: 'https://www.linkedin.com/in/marklarah',
    },
};

const ContactInformation = {
    firstName: 'Mark',
    lastName: 'Larah',
    fullName: 'Mark Larah',
    email: 'mark@larah.me',
    website: 'https://mark.larah.me',
};

const socialTypeDefs = gql`
    enum WebPresence {
        TWITTER
        GITHUB
        LINKEDIN
        STACK_OVERFLOW
    }

    type PGP {
        fingerprint: String
        publicKey: String
    }

    type ContactInformation {
        firstName: String
        lastName: String
        fullName: String
        email: String
        website: String
    }

    type Profile {
        username: String
        link: String
        platform: String
    }

    type Query {
        pgp: PGP!
        contactInfo: ContactInformation!
        profile(type: WebPresence!): Profile!
        allProfiles: [Profile!]!
    }
`;

class KeybaseAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'https://keybase.io/mark_larah/';
    }

    async getPgpKeys(id) {
        return this.get('pgp_keys.asc');
    }
}

class S3API extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'http://markl42.s3-us-west-1.amazonaws.com/';
    }

    async getRecipesJson(id) {
        return this.get('recipes.json');
    }
}

const resolvers = {
    Query: {
        contactInfo() {
            return ContactInformation;
        },
        pgp: async (_, __, { dataSources }) => {
            const { keybase } = dataSources;
            const publicKey = await keybase.getPgpKeys();

            return {
                fingerprint: 'D02E6A720CD88AC465CF14AB1640AC3E8DCF8CE7',
                publicKey,
            };
        },
        profile: async (_, { type }) => {
            return Profiles[type];
        },
        allProfiles: async (_, { type }) => {
            return Object.values(Profiles);
        },
    },
};

export const typeDefs = mergeTypeDefs([socialTypeDefs, Recipe.typeDefs]);
const schema = makeExecutableSchema({
    typeDefs,
    resolvers: [resolvers, Recipe.resolvers],
});

function createServer() {
    // Check if we're running locally, outside of an actual Netfify/Lambda deploy
    // @see https://docs.netlify.com/configure-builds/environment-variables/#build-metadata
    const isLocalDev = process.env.NETLIFY !== 'true';

    return new ApolloServer({
        schema,
        dataSources: () => {
            return {
                keybase: new KeybaseAPI(),
                s3: new S3API(),
            };
        },
        engine: {
            apiKey: APOLLO_API_KEY,
        },
        resolvers,
        introspection: isLocalDev,
        playground: isLocalDev
            ? {
                  endpoint: '/dev/graphql',
              }
            : false,
    });
}

export default createServer;
