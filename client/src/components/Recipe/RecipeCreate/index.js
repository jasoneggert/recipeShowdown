import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { Button } from 'grommet';
import ErrorMessage from '../../Error';

const CREATE_RECIPE = gql`
  mutation($text: String!) {
    createRecipe(text: $text) {
      id
      text
      createdAt
      user {
        id
        username
      }
    }
  }
`;

class RecipeCreate extends Component {
  state = {
    text: '',
  };

  onChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  onSubmit = async (event, createRecipe) => {
    event.preventDefault();

    try {
      await createRecipe();
      this.setState({ text: '' });
    } catch (error) {}
  };

  render() {
    const { text } = this.state;
    console.log('text: ', text);

    return (
      <Mutation
        mutation={CREATE_RECIPE}
        variables={{ text }}
        // Not used anymore because of Subscription

        // update={(cache, { data: { createMessage } }) => {
        //   const data = cache.readQuery({
        //     query: GET_ALL_MESSAGES_WITH_USERS,
        //   });

        //   cache.writeQuery({
        //     query: GET_ALL_MESSAGES_WITH_USERS,
        //     data: {
        //       ...data,
        //       messages: {
        //         ...data.messages,
        //         edges: [createMessage, ...data.messages.edges],
        //         pageInfo: data.messages.pageInfo,
        //       },
        //     },
        //   });
        // }}
      >
        {(createRecipe, { data, loading, error }) => (
          <form
            onSubmit={event => this.onSubmit(event, createRecipe)}
          >
            <textarea
              name="text"
              value={text}
              onChange={this.onChange}
              type="text"
              placeholder="Your recipe ..."
            />
            <Button plain={false} type="submit">Send</Button>

            {error && <ErrorMessage error={error} />}
          </form>
        )}
      </Mutation>
    );
  }
}

export default RecipeCreate;
