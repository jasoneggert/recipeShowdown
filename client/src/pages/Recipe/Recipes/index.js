import React, { Component, Fragment } from 'react';
import gql from 'graphql-tag';

// import MessageDelete from '../MessageDelete';
import Loading from '../../Loading';
import withSession from '../../Session/withSession';

const RECIPE_CREATED = gql`
  subscription {
    recipeCreated {
      recipe {
        id
        text
        createdAt
        user {
          id
          username
        }
      }
    }
  }
`;

const GET_PAGINATED_RECIPES_WITH_USERS = gql`
  query($cursor: String, $limit: Int!) {
    recipes(cursor: $cursor, limit: $limit)
      @connection(key: "MessagesConnection") {
      edges {
        id
        text
        createdAt
        user {
          id
          username
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

const Recipes = ({ limit }) => {
  const { loading, error, data, subscribeToMore, refetch } = useQuery(
    GET_PAGINATED_RECIPES_WITH_USERS,
  );
  return recipes.map(recipe => (
    <RecipeItem key={recipe.id} recipe={recipe} />
  ));
}

const RecipeItemBase = ({ recipe, session }) => (
  <div>
    {recipe.user && <h3>{recipe.user.username}</h3>}
    <small>{recipe.createdAt}</small>
    <p>{recipe.name}</p>
  </div>
);

const RecipeItem = withSession(RecipeItemBase);

export default Recipes;
