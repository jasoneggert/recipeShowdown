import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Box, Button, TextInput } from 'grommet';
import styled from 'styled-components';
const CREATE_RECIPE = gql`
  mutation($data: RecipeInput!) {
    createRecipe(data: $data) {
      name
    }
  }
`;

const Ingredients = styled.div`
  padding: 20px 0;
  margin: 20px 0;
`;

const RecipeCreate = () => {
  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [preperation, setPreperation] = useState([]);

  const [createRecipe] = useMutation(CREATE_RECIPE);
  const onNameChange = e => {
    setName(e.target.value);
    console.log(name);
  };
  const addIngredient = ({ value, measurment, name }) => {
    const newIngredients = [...ingredients];
    newIngredients.push({ value, measurment, name });
    setIngredients(newIngredients);
  };
  const addPrepStep = ({ step }) => {
    const newPreperation = [...preperation];
    newPreperation.push({ step });
    setPreperation(newPreperation);
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
          onChange={e => onNameChange(e)}
          type="string"
          placeholder="Name"
        />
      </Box>
      <Ingredients>
        
        <Button
          plain={false}
          onClick={() =>
            addIngredient({ variables: { data: { name: name } } })
          }
        >
          Add Ingredient
        </Button>
      </Ingredients>
      <Button
        plain={false}
        onClick={() => addPrepStep(1, 'CUP', 'vinegar')}
      >
        Add Prep Step
      </Button>
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

export default RecipeCreate;
