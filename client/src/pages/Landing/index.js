import React from 'react';
import withSession from '../Session/withSession';
import { Box } from 'grommet';
import { RecipeCreate, Recipes } from '../Recipe';
const Landing = ({ session }) => (
  <Box
    background={'black'}
    animation={'fadeIn'}
    direction="column"
    align="left"
    justify="between"
    pad={{
      left: 'small',
      right: 'small',
      top: 'small',
      bottom: 'small',
    }}
    elevation="none"
    style={{ zIndex: '1' }}
    fill={true}
  >
    <h2>Recipes</h2>

    {session && session.me && <RecipeCreate />}
  </Box>
);

export default withSession(Landing);
