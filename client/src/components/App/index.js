import React from 'react';
import { Router, Route } from 'react-router-dom';

import Navigation from '../Navigation';
import LandingPage from '../Landing';

import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import AccountPage from '../Account';
import AdminPage from '../Admin';
import withSession from '../Session/withSession';

import * as routes from '../../constants/routes';
import history from '../../constants/history';
import {
  Box,
  Button,
  Collapsible,
  Heading,
  Grommet,
  Layer,
  ResponsiveContext,
} from 'grommet';

import { FormClose, Notification } from 'grommet-icons';



const App = ({ session, refetch }) => (
  <Router history={history}>
    <Box
      tag="header"
      direction="row"
      align="center"
      justify="between"
      pad={{ left: 'medium', right: 'small', vertical: 'small' }}
      elevation="medium"
      style={{ zIndex: '1' }}
    >
      <div>
        <Navigation session={session} />

        <hr />

        <Route
          exact
          path={routes.LANDING}
          component={() => <LandingPage />}
        />
        <Route
          exact
          path={routes.SIGN_UP}
          component={() => <SignUpPage refetch={refetch} />}
        />
        <Route
          exact
          path={routes.SIGN_IN}
          component={() => <SignInPage refetch={refetch} />}
        />
        <Route
          exact
          path={routes.ACCOUNT}
          component={() => <AccountPage />}
        />
        <Route
          exact
          path={routes.ADMIN}
          component={() => <AdminPage />}
        />
      </div>
    </Box>
  </Router>
);

export default withSession(App);
