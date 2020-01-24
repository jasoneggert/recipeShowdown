import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    recipes(cursor: String, limit: Int): RecipeConnection!
    recipe(id: ID!): Recipe!
  }

  extend type Mutation {
    createRecipe(text: String!): Recipe!
    deleteRecipe(id: ID!): Boolean!
  }

  type RecipeConnection {
    edges: [Recipe!]!
    pageInfo: RecipePageInfo!
  }

  type RecipePageInfo {
    hasNextPage: Boolean!
    endCursor: String!
  }

  type Recipe {
    id: ID!
    text: String!
    createdAt: Date!
    user: User!
  }

  extend type Subscription {
    recipeCreated: RecipeCreated!
  }

  type RecipeCreated {
    recipe: Recipe!
  }
`;
