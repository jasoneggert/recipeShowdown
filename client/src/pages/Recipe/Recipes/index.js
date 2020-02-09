import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { LeftAlignBox } from '../../../lib/boxes';
// import MessageDelete from '../MessageDelete';
import Loading from '../../Loading';
import withSession from '../../Session/withSession';

const RECIPE_CREATED = gql`
  subscription {
    recipeCreated {
      recipe {
        id

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
      @connection(key: "RecipeConnection") {
      edges {
        id
        name
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
    {
      variables: { limit: limit },
    },
  );
  console.log('data: ', data);
  if (loading) {
    return <span>Loading</span>;
  }
  if (!data) {
    return <span>No Recipes</span>;
  }
  return LeftAlignBox(
    data.recipes.edges.map(recipe => {
      console.log('recipe: ', recipe);
      return <RecipeItem key={recipe.id} recipe={recipe} />;
    }),
  );
};

const RecipeItemBase = ({ recipe, session }) =>
  LeftAlignBox(
    <div>
      <h3>{recipe.name}</h3>
      <div>{recipe.createdAt}</div>
      {recipe.user && <div>{recipe.user.username}</div>}
    </div>,
  );

const RecipeItem = withSession(RecipeItemBase);

export default Recipes;
