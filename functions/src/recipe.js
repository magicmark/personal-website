import gql from 'graphql-tag';
import FlexSearch from 'flexsearch';
// import GoopError from './goopError';

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

// class Goop {
//     constructor() {
//         const { name, schema } = this.constructor;

//         if (!schema) {
//             throw new GoopError(
//                 [
//                     `[goop :: ${name}]`,
//                     `It looks like you tried to construct the GraphQL type class`,
//                     `for \`${name}\` without defining the \`schema\` attribute.`,
//                     `You need to attach the schema(s) for this class under \`${name}.schema\`.`,
//                 ].join(' '),
//             );
//         }

//         const isSchemaValid =
//             schema instanceof Object && schema.kind === 'Document' && Array.isArray(schema.definitions);

//         if (!isSchemaValid) {
//             throw new GoopError(
//                 [
//                     `[goop :: ${name}]`,
//                     `\`${name}.schema\` doesn't look like a valid.`,
//                     `This should be a GraphQL Schema string wrapped by graphql-tag.`,
//                 ].join(' '),
//             );
//         }

//         // Find the type def for this type
//         const typeDef = typeDefs.definitions.find((def) => def.name.value === name);
//         if (!typeDef) {
//             throw new GoopError(
//                 [
//                     `[goop :: ${name}] I couldn't find a type definition for \`${name}\` in \`${name}.schema\`.`,
//                     `(Maybe you have JavaScript minification enabled? Try explicitly setting \`${name}.name\`)`,
//                 ].join(' '),
//             );
//         }

//         const { fields } = typeDef;
//         const fieldNames = fields.map(f => f.name.value);

//         // const classFields = Object.keys(this)
//        // console.log('classFields', Object.getOwnPropertyDescriptors(this.constructor))
//        this.fromFields = (args) => {
//            console.log('args', args)
//        }
//     }
// }

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
            const recipes = await dataSources.s3.getRecipesJson();
            const index = new FlexSearch('speed');
            recipes.forEach((recipe) => {
                index.add(recipe.id, JSON.stringify(recipe));
            });
            const result = await index.search(query);
            return result.map((id) => Recipe.fromId(id));
        },
    },
};

// //export const fromId = Recipe.fromId;

// //             id: String!
// //             source: String
// //             serves: Int
// //             tags: [String!]
// //             name: String!
// //             link: String

// //     const recipes = s3.getRecipesJson();
// //     const ids = recipes.map(r => r.id);
// //     return ids;
// // },
// // recipes: async ({ id }) => {
// //     return id;
// // },

// // }

// //function fromId

// // const resolverMap = {
// //     Query: {
// //         recipe: async (obj, { id }, { dataSources }) => {
// //             const { s3 } = dataSources;
// //             const recipes = s3.getRecipesJson();
// //             const ids = recipes.map(r => r.id);
// //             return ids;
// //         },
// //         recipes: async ({ id }) => {
// //             return id;
// //         },

// //       recipe: (_, { id }) => {
// //         return {
// //           _id: id,
// //           username: 'jhon'
// //         };
// //       }
// //     },
// //     User: {
// //       id: user => user._id,
// //       username: user => user.username
// //     }
// //   };

// // export const MyFirstModule = new GraphQLModule({
// //     typeDefs: gql`
// //         type Query {
// //             recipe(id: String!): Recipe!
// //             recipes: [Recipe!]!
// //         }

// //         type Recipe {
// //             id: String!
// //             source: String
// //             serves: Int
// //             tags: [String!]
// //             name: String!
// //             link: String
// //         }
// //     `,
// // });
