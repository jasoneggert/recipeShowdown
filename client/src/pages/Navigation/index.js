import React from 'react';
import * as routes from '../../constants/routes';
import SignOutButton from '../SignOut';
import { Anchor, Box, DropButton } from 'grommet';

const Navigation = ({ session }) => (
  <Box pad="large" background="background" fill={true}>
    <DropButton
      color={'accent-2'}
      label="Navigation"
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
  <Box pad="small" background="background">
    <ul>
      <li>
        <Anchor href={routes.LANDING} color={'#CEFF1A'}>
          Landing
        </Anchor>
      </li>
      <li>
        <Anchor href={routes.ACCOUNT} color={'#CEFF1A'}>
          Account ({session.me.username})
        </Anchor>
      </li>
      {session && session.me && session.me.role === 'ADMIN' && (
        <li>
          <Anchor  href={routes.ADMIN} color={'#CEFF1A'}>Admin</Anchor>
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
    <Anchor href={routes.SIGN_IN} color={'#CEFF1A'}>Sign In</Anchor>

    <Anchor href={routes.LANDING} color={'#CEFF1A'}>Landing</Anchor>
  </Box>
);

export default Navigation;
