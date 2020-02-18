import React, { Fragment, useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { Link, withRouter } from 'react-router-dom';

import gql from 'graphql-tag';
import { Box, Button, Select, TextInput } from 'grommet';
import styled from 'styled-components';
import { LeftAlignBox, RowBox } from '../../../lib/boxes';
import * as routes from '../../../constants/routes';
import { Redirect } from 'react-router-dom';

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

const RecipeCreate = ({history, refetch}) => {
  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [preperation, setPreperation] = useState([]);

  const [createRecipe] = useMutation(CREATE_RECIPE);
  const onNameChange = e => {
    setName(e.target.value);
    console.log(name);
  };

  const onIngredientNameChange = (i, e) => {
    const newIngredients = [...ingredients];
    newIngredients[i].name = e.target.value;
    setIngredients(newIngredients);
  };

  const onIngredientValueChange = (i, e) => {
    const newIngredients = [...ingredients];
    newIngredients[i].value = parseInt(e.target.value);
    setIngredients(newIngredients);
  };

  const onIngredientMeasurementSelect = (i, e) => {
    console.log('wut', e);
    const newIngredients = [...ingredients];
    newIngredients[i].measurement = e.value;
    setIngredients(newIngredients);
  };

  const addPrepStep = ({ step }) => {
    const newPreperation = [...preperation];
    newPreperation.push({ step });
    setPreperation(newPreperation);
  };

  const createAndGoBack = () => {
    createRecipe({
      variables: {
        data: { name: name, ingredients: ingredients },
      },
    }).then(async ({ data }) => {
      // await refetch();
      history.push(routes.RECIPES);
    });
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
            setIngredients([...ingredients, { name: '' }]);
            console.log('ingredients: ', ingredients);
          }}
        >
          Add Ingredient
        </Button>
        <div>
          {ingredients.map((ingredient, i) =>
            RowBox(
              <Fragment>
                <TextInput
                  name="ingredi amount"
                  value={ingredient.value}
                  onChange={e => onIngredientValueChange(i, e)}
                  type="number"
                  placeholder=""
                />
                <Select
                  options={[
                    'CUP',
                    'OZ',
                    'TBSP',
                    'TSP',
                    'PT',
                    'QT',
                    'GAL',
                  ]}
                  value={
                    ingredient.measurement
                      ? ingredient.measurement
                      : 'choose'
                  }
                  onChange={e => onIngredientMeasurementSelect(i, e)}
                />
                <TextInput
                  name="ingredientname"
                  value={ingredient.name}
                  onChange={e => onIngredientNameChange(i, e)}
                  type="string"
                  placeholder=""
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
        onClick={() => {
          createAndGoBack(history, createRecipe);
          console.log('TCL: history', history);
        }}
      >
        Save Recipe
      </Button>
    </React.Fragment>,
  );
};

export default withRouter(RecipeCreate);
