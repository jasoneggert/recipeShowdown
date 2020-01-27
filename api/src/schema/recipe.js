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
    text: String
  }
  
  input RecipeInput {
    name: String
    ingredients: [IngredientInput]
    preperation: [PrepStepInput]
  }

  type Ingredient {
    id: ID!
    value: Float
    measurement: Measurement
    name: String!
  }

  input IngredientInput {
    value: Float
    measurement: Measurement
    name: String!
  }

  type PrepStep {
    id: ID!
    ordinal: Int
    step: String
  }

  input PrepStepInput {
    ordinal: Int
    step: String
  }

  enum Measurement {
    CUP
    TABLESPOON
    TEASPOON
    OUNCE
    FLUID_OUNCES
    MILLITERS
    QUART
    GALLON
  }

  extend type Subscription {
    recipeCreated: RecipeCreated!
  }

  type RecipeCreated {
    recipe: Recipe!
  }
`;
