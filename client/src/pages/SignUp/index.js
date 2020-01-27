import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import * as routes from '../../constants/routes';
import ErrorMessage from '../Error';

const SIGN_UP = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    signUp(username: $username, email: $email, password: $password) {
      token
    }
  }
`;

const INITIAL_STATE = {
  username: '',
  email: '',
  password: '',
  passwordConfirmation: '',
};

const SignUpPage = ({ history, refetch }) => (
  <div>
    <h1>SignUp</h1>
    <SignUpForm history={history} refetch={refetch} />
  </div>
);

const SignUpForm = ({ history, refetch }) => {
  const [
    { username, email, password, passwordConfirmation },
    setState,
  ] = useState(INITIAL_STATE);

  const [signIn, data, loading, error] = useMutation(SIGN_UP);

  const clearState = () => {
    setState({ ...INITIAL_STATE });
  };

  const onChange = e => {
    const { name, value } = e.target;
    setState(prevState => ({ ...prevState, [name]: value }));
  };

  const onSubmit = (event, signUp) => {
    signUp().then(async ({ data }) => {
      clearState();
      localStorage.setItem('token', data.signUp.token);
      await refetch();
      history.push(routes.LANDING);
    });

    event.preventDefault();
  };

  const isInvalid =
    password !== passwordConfirmation ||
    password === '' ||
    email === '' ||
    username === '';
  const [signUp] = useMutation(SIGN_UP);
  return (
    <form onSubmit={event => onSubmit(event, signUp)}>
      <input
        name="username"
        value={username}
        onChange={onChange}
        type="text"
        placeholder="Full Name"
      />
      <input
        name="email"
        value={email}
        onChange={onChange}
        type="text"
        placeholder="Email Address"
      />
      <input
        name="password"
        value={password}
        onChange={onChange}
        type="password"
        placeholder="Password"
      />
      <input
        name="passwordConfirmation"
        value={passwordConfirmation}
        onChange={onChange}
        type="password"
        placeholder="Confirm Password"
      />
      <button disabled={isInvalid || loading} type="submit">
        Sign Up
      </button>

      {error && <ErrorMessage error={error} />}
    </form>
  );
};

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={routes.SIGN_UP}>Sign Up</Link>
  </p>
);

export default withRouter(SignUpPage);

export { SignUpForm, SignUpLink };
