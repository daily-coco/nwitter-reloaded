import { useState } from 'react';
import { auth } from './firebase';
import { Link, useNavigate } from 'react-router-dom';
import { FirebaseError } from 'firebase/app';
import { signInWithEmailAndPassword } from 'firebase/auth';
import {
  Error,
  Input,
  Form,
  Switcher,
  Title,
  Wrapper,
  Reset,
} from '../components/auth-components';
import GithubButton from '../components/github-button';

export default function Login() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const [error, setError] = useState('');

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (isLoading || email === '' || password === '') return;
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (e) {
      if (e instanceof FirebaseError) {
        setError(e.message);
      }
      //setError
    } finally {
      setLoading(false);
    }
  };

  return (
    <Wrapper>
      <Form onSubmit={onSubmit}>
        <Title>Login X</Title>
        <Input
          onChange={onChange}
          name='email'
          value={email}
          placeholder='email'
          type='email'
          required
        />
        <Input
          onChange={onChange}
          name='password'
          value={password}
          placeholder='password'
          type='password'
          required
        />
        <Input type='submit' value={isLoading ? 'Loading' : 'Login'} />
      </Form>
      {error !== '' ? <Error>{error}</Error> : null}
      <Switcher>
        Don't have an account?
        <Link to='/create-account'>Create one &rarr;</Link>
      </Switcher>
      <GithubButton />
      <Reset>
        Lost your password?
        <Link to='/reset-password'>Reset password &rarr;</Link>
      </Reset>
    </Wrapper>
  );
}
