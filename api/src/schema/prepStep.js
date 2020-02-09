import { gql } from 'apollo-server-express';

export default gql`
  type PrepStep {
    id: ID!
    ordinal: Int
    step: String
  }

  input PrepStepInput {
    ordinal: Int
    step: String
  }
`;
