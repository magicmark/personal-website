import * as React from 'react';
import { useQuery } from 'graphql-hooks';
import { useDebounce } from 'use-debounce';

import Link from './Link';

const GET_RECIPES_QUERY = /* GraphQL */ `
    query GET_RECIPES($query: String!) {
        recipeSearch(query: $query) {
            id
            name
            link
        }
    }
`;

const RecipeSearchResults = ({ searchQuery }) => {
    const { loading, error, data } = useQuery(GET_RECIPES_QUERY, {
        variables: {
            query: searchQuery,
        },
    });

    if (loading) return <ul></ul>;
    if (error) return 'Error fetching recipes :(';

    return (
        <ul>
            {data.recipeSearch.map((recipe) => (
                <li key={recipe.id}>
                    <Link href={recipe.link}>{recipe.name}</Link>
                </li>
            ))}
        </ul>
    );
};

const Recipes = () => {
    const [recipeSearch, setRecipeSearch] = React.useState('soup');
    const handleChange = (e) => {
        setRecipeSearch(e.target.value);
    };
    const [debouncedRecipeSearch] = useDebounce(recipeSearch, 700);

    return (
        <>
            <h2>Recipes</h2>
            Search: <input type="text" onChange={handleChange} value={recipeSearch} />
            <RecipeSearchResults searchQuery={debouncedRecipeSearch} />
        </>
    );
};

export default Recipes;
