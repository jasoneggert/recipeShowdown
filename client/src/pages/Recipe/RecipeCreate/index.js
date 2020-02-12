import React, { Fragment, useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Box, Button, Select, TextInput } from 'grommet';
import styled from 'styled-components';
import { LeftAlignBox, RowBox } from '../../../lib/boxes';
const CREATE_RECIPE = gql`
  mutation($data: RecipeInput!) {
    createRecipe(data: $data) {
      name
    }
  }
`;

const PaddedMarginDiv = styled.div`
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

  return LeftAlignBox(
    <React.Fragment>
      <TextInput
        name="recipeName"
        value={name}
        onChange={e => onNameChange(e)}
        type="string"
        placeholder="Name"
      />
      <PaddedMarginDiv>
        <Button
          plain={false}
          onClick={() => {
            setIngredients([...ingredients, { name: 'name' }]);
            console.log('ingredients: ', ingredients);
          }}
        >
          Add Ingredient
        </Button>
        <div>
          {ingredients.map((ingredient, i) =>
            RowBox(
              <Fragment>
                <div>{ingredient.name}</div>
                <Select
                  options={['small', 'medium', 'large']}
                  value={'small'}
                />
              </Fragment>,
            ),
          )}
        </div>
      </PaddedMarginDiv>
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
    </React.Fragment>,
  );
};

export default RecipeCreate;
