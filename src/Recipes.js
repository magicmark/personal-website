import * as React from 'react';
// eslint-disable-next-line no-unused-vars
import styled from 'styled-components/macro';
import { useQuery } from 'graphql-hooks';
import { useDebounce } from 'use-debounce';
import spinner from './spinner.svg';
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

const SkullEmoji = () => (
    <span role="img" aria-label="error">
        💀
    </span>
);

const RecipeSearch = ({ searchBox, searchQuery, isDebouncing }) => {
    const { loading, error, data } = useQuery(GET_RECIPES_QUERY, {
        variables: {
            query: searchQuery,
        },
    });

    if (loading) return searchBox(true);

    if (error)
        return (
            <>
                {searchBox(false)}
                <div>
                    <b>
                        <SkullEmoji /> Error fetching data :(
                    </b>
                    <pre>{JSON.stringify(error, null, 4)}</pre>
                </div>
            </>
        );

    return (
        <>
            {searchBox(isDebouncing)}
            <ul>
                {data.recipeSearch.map((recipe) => (
                    <li key={recipe.id}>
                        <Link href={recipe.link}>{recipe.name}</Link>
                    </li>
                ))}
            </ul>
        </>
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
            <RecipeSearch
                searchBox={(showSpinner) => (
                    <div
                        css={`
                            height: 28px;
                            display: grid;
                            grid-template-columns: min-content 100px auto;
                            grid-gap: 6px;
                        `}
                    >
                        <div
                            css={`
                                align-self: center;
                            `}
                        >
                            Search:
                        </div>
                        <div
                            css={`
                                align-self: center;
                            `}
                        >
                            <input
                                css={`
                                    width: 100%;
                                `}
                                type="text"
                                onChange={handleChange}
                                value={recipeSearch}
                            />
                        </div>
                        <div
                            css={`
                                padding-top: 4px;
                                padding-left: 2px;
                            `}
                        >
                            {showSpinner && <img src={spinner} alt="loader" height="20px" />}
                        </div>
                    </div>
                )}
                searchQuery={debouncedRecipeSearch}
                isDebouncing={recipeSearch !== debouncedRecipeSearch}
            />
        </>
    );
};

export default Recipes;
