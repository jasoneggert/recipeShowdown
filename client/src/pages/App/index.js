import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import Navigation from '../Navigation';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import AccountPage from '../Account';
import AdminPage from '../Admin';
import withSession from '../Session/withSession';
import * as routes from '../../constants/routes';
import history from '../../constants/history';
import { Box } from 'grommet';
import { RecipeCreate, Recipes } from '../Recipe';

const App = ({ session, refetch }) => (
  <Router history={history}>
    <React.Fragment>
      <Box
        background={'background'}
        tag="content"
        animation={'fadeIn'}
        direction="column"
        align="center"
        justify="between"
        pad={{
          left: 'large',
          right: 'large',
          top: 'small',
          bottom: 'large',
        }}
        elevation="medium"
        style={{ zIndex: '1' }}
        fill={true}
      >
        <h1>Recipe DeathMatch</h1>
        <Navigation session={session} />
        <Box
          background={'background'}
          tag="content"
          animation={'fadeIn'}
          direction="column"
          align="center"
          justify="between"
          pad={{
            left: 'large',
            right: 'large',
            top: 'none',
            bottom: 'large',
          }}
          elevation="none"
          style={{ zIndex: '1' }}
          fill={true}
        >
          <Switch>
            <Route
              exact
              path={routes.CREATERECIPE}
              component={() => <RecipeCreate refetch={refetch}/>}
            />
            <Route
              exact
              path={routes.RECIPES}
              component={() => <Recipes limit={25}/>}
            />
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
          </Switch>
        </Box>
      </Box>
    </React.Fragment>
  </Router>
);

export default withSession(App);
