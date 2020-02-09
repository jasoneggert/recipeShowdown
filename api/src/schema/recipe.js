import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    recipes(cursor: String, limit: Int): RecipeConnection!
    recipe(id: ID!): Recipe!
  }

  extend type Mutation {
    createRecipe(data: RecipeInput!): Recipe!
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
    name: String
    ingredients: [Ingredient]
    preperation: [PrepStep]
    createdAt: Date!
    user: User!
  }
  
  input RecipeInput {
    name: String
    ingredients: [IngredientInput]
    preperation: [PrepStepInput]
  }



  extend type Subscription {
    recipeCreated: RecipeCreated!
  }

  type RecipeCreated {
    recipe: Recipe!
  }
`;
