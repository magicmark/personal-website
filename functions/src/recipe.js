import gql from 'graphql-tag';
import lunr from 'lunr';

export const typeDefs = gql`
    extend type Query {
        recipe(id: String!): Recipe!
        recipeSearch(query: String!): [Recipe!]!
    }

    type Recipe {
        id: String!
        source: String
        serves: String
        tags: [String!]
        name: String!
        link: String
    }
`;

async function getRecipe(id, s3) {
    const recipes = await s3.getRecipesJson();
    const recipe = recipes.find((r) => r.id === id);

    if (!recipe) {
        throw new Error(`Recipe ${id} not found`);
    }

    return recipe;
}

class Recipe {
    //static schema = typeDefs;
    static name = 'Bloop';

    constructor({ id }) {
        this.id = id;
    }

    static async fromId(id) {
        return new Recipe({ id });
    }

    async name(_, { dataSources }) {
        const { name } = await getRecipe(this.id, dataSources.s3);
        return name;
    }

    async source(_, { dataSources }) {
        const { source } = await getRecipe(this.id, dataSources.s3);
        return source;
    }

    async serves(_, { dataSources }) {
        const { serves } = await getRecipe(this.id, dataSources.s3);
        return serves;
    }

    async tags(_, { dataSources }) {
        const { tags } = await getRecipe(this.id, dataSources.s3);
        return tags;
    }

    async link(_, { dataSources }) {
        const { link } = await getRecipe(this.id, dataSources.s3);
        return link;
    }
}

export const resolvers = {
    Query: {
        recipe: async (_, { id }, { dataSources }) => {
            await getRecipe(id, dataSources.s3); // check that it exists
            return Recipe.fromId(id);
        },
        recipeSearch: async (_, { query }, { dataSources }) => {
            if (query.length < 2) {
                throw new Error('query must be at least 3 chars');
            }

            const recipes = await dataSources.s3.getRecipesJson();

            const index = lunr(function () {
                this.field('source');
                this.field('tags');
                this.field('name');
                this.field('id');

                recipes.forEach((recipe) => {
                    this.add(recipe);
                });
            });

            const result = index.search(query);
            return result.map(({ ref }) => Recipe.fromId(ref));
        },
    },
};