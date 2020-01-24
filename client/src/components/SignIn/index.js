import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import { SignUpLink } from '../SignUp';
import * as routes from '../../constants/routes';
import ErrorMessage from '../Error';
import { Box, Button, TextInput } from 'grommet';

const SIGN_IN = gql`
  mutation($login: String!, $password: String!) {
    signIn(login: $login, password: $password) {
      token
    }
  }
`;

const SignInPage = ({ history, refetch }) => (
  <div>
    <h1>SignIn</h1>
    <SignInForm history={history} refetch={refetch} />
    <SignUpLink />
  </div>
);

const INITIAL_STATE = {
  login: '',
  password: '',
};

class SignInForm extends Component {
  state = { ...INITIAL_STATE };

  onChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  onSubmit = (event, signIn) => {
    signIn().then(async ({ data }) => {
      console.log('data: ', data);
      console.log('wha', event, signIn);
      this.setState({ ...INITIAL_STATE });

      localStorage.setItem('token', data.signIn.token);

      await this.props.refetch();
      this.props.history.push(routes.LANDING);
    });

    event.preventDefault();
  };

  render() {
    const { login, password } = this.state;

    const isInvalid = password === '' || login === '';

    return (
      <Mutation mutation={SIGN_IN} variables={{ login, password }}>
        {(signIn, { data, loading, error }) => (
          <form onSubmit={event => this.onSubmit(event, signIn)}>
            <Box
              direction="column"
              pad={{
                left: 'small ',
                right: 'small',
                vertical: 'small',
              }}
              style={{ zIndex: '1' }}
            >
              <TextInput
                name="login"
                value={login}
                onChange={this.onChange}
                type="text"
                placeholder="Email or Username"
              />
            </Box>
            <Box
              direction="column"
              pad={{
                left: 'small ',
                right: 'small',
                vertical: 'small',
              }}
              style={{ zIndex: '1' }}
            >
              <TextInput
                name="password"
                value={password}
                onChange={this.onChange}
                type="password"
                placeholder="Password"
              />
            </Box>
            <Box
              direction="column"
              pad={{
                left: 'small ',
                right: 'small',
                vertical: 'small',
              }}
              style={{ zIndex: '1' }}
            >
              <Button plain={false} fill={'horizontal'} type="submit">
                Sign In
              </Button>
            </Box>

            {error && <ErrorMessage error={error} />}
          </form>
        )}
      </Mutation>
    );
  }
}

export default withRouter(SignInPage);

export { SignInForm };
