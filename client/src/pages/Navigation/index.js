import React from 'react';
import * as routes from '../../constants/routes';
import SignOutButton from '../SignOut';
import { Anchor, Box, DropButton } from 'grommet';

const Navigation = ({ session }) => (
  <Box pad="none" background="background" fill={true}>
    <DropButton
      color={'accent-1'}
      label="Menu"
      dropAlign={{ top: 'bottom', left: 'left' }}
      dropContent={
        session && session.me ? (
          <NavigationAuth session={session} />
        ) : (
          <NavigationNonAuth />
        )
      }
    />
  </Box>
);

const NavigationAuth = ({ session }) => (
  <Box pad="large" background="background">
    <ul>
      <li>
        <Anchor href={routes.RECIPES}>
          Recipes
        </Anchor>
      </li>
      <li>
        <Anchor href={routes.CREATERECIPE}>
          Create Recipe
        </Anchor>
      </li>
      <li>
        <Anchor href={routes.ACCOUNT}>
          Account ({session.me.username})
        </Anchor>
      </li>
      {session && session.me && session.me.role === 'ADMIN' && (
        <li>
          <Anchor href={routes.ADMIN}>
            Admin
          </Anchor>
        </li>
      )}
      <li>
        <SignOutButton />
      </li>
    </ul>
  </Box>
);

const NavigationNonAuth = () => (
  <Box pad="large" background="background">
    <Anchor href={routes.SIGN_IN}>
      Sign In
    </Anchor>
    <li>
      <Anchor href={routes.RECIPES}>
        Recipes
      </Anchor>
    </li>
    <li>
      <Anchor href={routes.CREATERECIPE}>
        Create Recipe
      </Anchor>
    </li>{' '}
  </Box>
);

export default Navigation;
