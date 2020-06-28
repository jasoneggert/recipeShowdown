import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { withRouter } from 'react-router-dom';
import gql from 'graphql-tag';
import { SignUpLink } from '../SignUp';
import * as routes from '../../constants/routes';
import ErrorMessage from '../Error';
import { Button, TextInput } from 'grommet';
import { StandardBox } from '../../lib/boxes';
import styled from 'styled-components';
const SIGN_IN = gql`
  mutation($login: String!, $password: String!) {
    signIn(login: $login, password: $password) {
      token
    }
  }
`;

const SignInContainer = styled.div`
  width: 600px;
`;

const SignInPage = ({ history, refetch }) => (
  <SignInContainer>
    <h1>SignIn</h1>
    <SignInForm history={history} refetch={refetch} />
    <SignUpLink />
  </SignInContainer>
);

const INITIAL_STATE = {
  login: '',
  password: '',
};

const SignInForm = ({ history, refetch }) => {
  const [{ login, password }, setState] = useState('');

  const onChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const clearState = () => {
    setState({ ...INITIAL_STATE });
  };

  const onSubmit = (event, signIn) => {
    localStorage.removeItem('token');
    console.log(login, password);
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
  const [signIn, error] = useMutation(SIGN_IN);
  return (
    <React.Fragment>
      {StandardBox(
        <TextInput
          name="login"
          value={login}
          onChange={onChange}
          type="text"
          placeholder="Email or Username"
        />,
      )}

      {StandardBox(
        <TextInput
          name="password"
          value={password}
          onChange={onChange}
          type="password"
          placeholder="Password"
        />,
      )}

      {StandardBox(
        <Button
          plain={false}
          fill={'horizontal'}
          type="submit"
          onClick={(e) => onSubmit(e, signIn)}
        >
          Sign In
        </Button>,
      )}

      {error && <ErrorMessage error={error} />}
    </React.Fragment>
  );
};

export default withRouter(SignInPage);

export { SignInForm };
