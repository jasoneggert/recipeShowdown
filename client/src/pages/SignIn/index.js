import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { withRouter } from 'react-router-dom';
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

const SignInForm = ({ history, refetch }) => {
  const [{ login, password }, setState] = useState('');

  const onChange = e => {
    const { name, value } = e.target;
    setState(prevState => ({ ...prevState, [name]: value }));
    console.log(name, value, 'state', login, password);
  };

  const clearState = () => {
    setState({ ...INITIAL_STATE });
  };

  const onSubmit = (event, signIn) => {
    localStorage.removeItem('token');
    signIn({ variables: { login: login, password: password } }).then(
      async ({ data }) => {
        clearState();
        localStorage.setItem('token', data.signIn.token);
        await refetch();
        history.push(routes.LANDING);
      },
    );

    event.preventDefault();
  };

  const isInvalid = password === '' || login === '';
  const [signIn, data, loading, error] = useMutation(SIGN_IN);
  return (
    <form onSubmit={event => onSubmit(event, signIn)}>
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
          onChange={onChange}
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
          onChange={onChange}
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
  );
};

export default withRouter(SignInPage);

export { SignInForm };
