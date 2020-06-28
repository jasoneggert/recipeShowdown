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
import styled from 'styled-components';
import { skull } from '../../lib/skull';

const MainBox = styled.div`
  padding: 20px 0;
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  justify-items: center;
  justify-content: center;
`;
const ContentBox = styled.div`
  padding: 20px 0;
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  justify-items: center;
  justify-content: center;
  width: 600px;
`;
const Title = styled.div`
  display: flex;
  flex-direction: row;
  align-content: center;
  align-items: center;
  justify-items: center;
  justify-content: center;
  width: 600px;
`;

const Nav = styled.div`
  display: flex;
  flex-direction: row;
  align-content: center;
  align-items: center;
  justify-items: center;
  justify-content: center;
  width: 400px;
  margin-left: 150px;
  position: relative;
  top: -20px;
  background: transparent;
`;
const Skull = styled.div`
  height: 90px;
  width: 60px;
  margin-right: 20px;
`;
const TitleText = styled.div`
  font-size: 33px;
  font-family: 'Metric', Arial, sans-serif;
  font-weight: 700;
  margin: 0;
  display: flex;
  flex-direction: column;
`;



const TitleSpan = styled.span`
  margin-bottom: 10px;
`;
const App = ({ session, refetch }) => (
  <Router history={history}>
    <MainBox>
      <React.Fragment>
        <Title>
          <Skull>{skull()}</Skull>
          <TitleText>
            <TitleSpan>The Recipe DeathMatch</TitleSpan>
            <Navigation session={session} />
          </TitleText>
        </Title>

        <ContentBox>
          <Switch>
            <Route
              exact
              path={routes.CREATERECIPE}
              component={() => <RecipeCreate refetch={refetch} />}
            />
            <Route
              exact
              path={routes.RECIPES}
              component={() => <Recipes limit={25} />}
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
        </ContentBox>
      </React.Fragment>
    </MainBox>
  </Router>
);

export default withSession(App);
