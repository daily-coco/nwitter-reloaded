import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from './firebase';
import {
  Error,
  Input,
  Form,
  Title,
  Wrapper,
  Switcher,
} from '../components/auth-components';
import { useState } from 'react';
import { FirebaseError } from 'firebase/app';
import { Link, useNavigate } from 'react-router-dom';
import Nav from '../components/nav';

export default function ResetPassword() {
  const [isLoading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    if (name === 'email') {
      setEmail(value);
    }
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (isLoading || email === '') return;
    try {
      setLoading(true);
      await sendPasswordResetEmail(auth, email);
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
      <Nav />
      <Form onSubmit={onSubmit}>
        <Title>Reset Password X</Title>
        <Input
          onChange={onChange}
          name='email'
          value={email}
          placeholder='email'
          type='email'
          required
        />
        <Input
          type='submit'
          value={isLoading ? 'Sending...' : 'Send by email'}
        />
      </Form>
      {error !== '' ? <Error>{error}</Error> : null}
      <Switcher>
        Go to <Link to='/login'>Login</Link>
      </Switcher>
    </Wrapper>
  );
}
