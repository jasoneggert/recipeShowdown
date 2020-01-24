import React, { Component, Fragment } from 'react';
import { Query } from 'react-apollo';
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

const Recipes = ({ limit }) => (
  <Query
    query={GET_PAGINATED_RECIPES_WITH_USERS}
    variables={{ limit }}
  >
    {({ data, loading, error, fetchMore, subscribeToMore }) => {
      console.log('data: ', data);
      if (!data) {
        return (
          <div>
            There are no recipes yet ... Try to create one by
            yourself.
          </div>
        );
      }

      const { recipes } = data;

      if (loading || !recipes) {
        return <Loading />;
      }

      const { edges, pageInfo } = recipes;

      return (
        <Fragment>
          <RecipeList
            recipes={edges}
            subscribeToMore={subscribeToMore}
          />

          {pageInfo.hasNextPage && (
            <MoreRecipesButton
              limit={limit}
              pageInfo={pageInfo}
              fetchMore={fetchMore}
            >
              More
            </MoreRecipesButton>
          )}
        </Fragment>
      );
    }}
  </Query>
);

const MoreRecipesButton = ({
  limit,
  pageInfo,
  fetchMore,
  children,
}) => (
  <button
    type="button"
    onClick={() =>
      fetchMore({
        variables: {
          cursor: pageInfo.endCursor,
          limit,
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          if (!fetchMoreResult) {
            return previousResult;
          }

          return {
            messages: {
              ...fetchMoreResult.recipes,
              edges: [
                ...previousResult.recipes.edges,
                ...fetchMoreResult.recipes.edges,
              ],
            },
          };
        },
      })
    }
  >
    {children}
  </button>
);

class RecipeList extends Component {
  subscribeToMoreRecipes = () => {
    this.props.subscribeToMore({
      document: RECIPE_CREATED,
      updateQuery: (previousResult, { subscriptionData }) => {
        if (!subscriptionData.data) {
          return previousResult;
        }
        console.log('subscription', subscriptionData);
        const { recipeCreated } = subscriptionData.data;

        return {
          ...previousResult,
          messages: {
            ...previousResult.recipes,
            edges: [
              recipeCreated.recipe,
              ...previousResult.recipes.edges,
            ],
          },
        };
      },
    });
  };

  componentDidMount() {
    this.subscribeToMoreRecipes();
  }

  render() {
    const { recipes } = this.props;

    return recipes.map(recipe => (
      <RecipeItem key={recipe.id} recipe={recipe} />
    ));
  }
}

const RecipeItemBase = ({ recipe, session }) => (
  <div>
    {recipe.user && <h3>{recipe.user.username}</h3>}

    <small>{recipe.createdAt}</small>
    <p>{recipe.text}</p>

    {/* {session &&
      session.me &&
      message.user.id === session.me.id && (
        <MessageDelete message={message} />
      )} */}
  </div>
);

const RecipeItem = withSession(RecipeItemBase);

export default Recipes;
