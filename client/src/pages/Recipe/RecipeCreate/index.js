import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Box, Button, TextInput } from 'grommet';

const CREATE_RECIPE = gql`
  mutation($data: RecipeInput!) {
    createRecipe(data: $data) {
      id
      name
      ingredients {
        value
        measurement
        name
      }
      preperation {
        ordinal
        step
      }
      createdAt
      user {
        id
        username
      }
    }
  }
`;

const RecipeCreate = () => {
  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [preperation, setPreperation] = useState([]);

  const [createRecipe] = useMutation(CREATE_RECIPE);
  const onNameChange = e => {
    setName(e.target.value);
  };

  return (
    <React.Fragment>
      <Box
        direction="column"
        pad={{
          left: 'small ',
          right: 'small',
          vertical: 'small',
        }}
        style={{ zIndex: '1' }}
      >
        <TextInput
          name="recipeName"
          value={name}
          onChange={onNameChange}
          type="string"
          placeholder="Name"
        />
      </Box>
      <Button
        plain={false}
        onClick={() =>
          createRecipe({ variables: { data: { name: name } } })
        }
      >
        Save Recipe
      </Button>
    </React.Fragment>
  );
};

// class RecipeCreate extends Component {
//   state = {
//     text: '',
//   };

//   onChange = event => {
//     const { name, value } = event.target;
//     this.setState({ [name]: value });
//   };

//   onSubmit = async (event, createRecipe) => {
//     event.preventDefault();

//     try {
//       await createRecipe();
//       this.setState({ text: '' });
//     } catch (error) {}
//   };

//   render() {
//     const { text } = this.state;
//     console.log('text: ', text);

//     return (
//       <Mutation
//         mutation={CREATE_RECIPE}
//         variables={{ text }}
//         // Not used anymore because of Subscription

//           // update={(cache, { data: { createMessage } }) => {
//           //   const data = cache.readQuery({
//           //     query: GET_ALL_MESSAGES_WITH_USERS,
//           //   });

//           //   cache.writeQuery({
//           //     query: GET_ALL_MESSAGES_WITH_USERS,
//           //     data: {
//           //       ...data,
//           //       messages: {
//           //         ...data.messages,
//           //         edges: [createMessage, ...data.messages.edges],
//           //         pageInfo: data.messages.pageInfo,
//           //       },
//           //     },
//           //   });
//           // }}
//       >
//         {(createRecipe, { data, loading, error }) => (
//           <form
//             onSubmit={event => this.onSubmit(event, createRecipe)}
//           >
//             <textarea
//               name="text"
//               value={text}
//               onChange={this.onChange}
//               type="text"
//               placeholder="Your recipe ..."
//             />
//             <Button plain={false} type="submit">Send</Button>

//             {error && <ErrorMessage error={error} />}
//           </form>
//         )}
//       </Mutation>
//     );
//   }
// }

export default RecipeCreate;
