import React from 'react';
import withSession from '../Session/withSession';
import { Box } from 'grommet';
import { RecipeCreate, Recipes } from '../Recipe';
const Landing = ({ session }) => (
  <Box
    background={'background'}
    animation={'fadeIn'}
    direction="column"
    align="start"
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
    

    {session && session.me && <RecipeCreate />}
  </Box>
);

export default withSession(Landing);
