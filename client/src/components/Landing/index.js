import React from 'react';

import withSession from '../Session/withSession';

import { RecipeCreate, Recipes } from '../Recipe';

const Landing = ({ session }) => (
  <div>
    <h2>Recipes</h2>

    {session && session.me && <RecipeCreate />}
    <Recipes limit={30} />
  </div>
);

export default withSession(Landing);
