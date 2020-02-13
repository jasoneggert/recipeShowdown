import { gql } from 'apollo-server-express';

export default gql`
  type Ingredient {
    id: ID!
    value: Int
    measurement: Measurement
    name: String!
  }

  input IngredientInput {
    value: Float
    measurement: Measurement
    name: String!
  }
  enum Measurement {
    CUP
    OZ
    TBSP
    TSP
    PT
    QT
    GAL
    NONE
  }
`;
