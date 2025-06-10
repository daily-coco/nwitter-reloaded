import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useState } from 'react';
import { auth } from './firebase';
import { Link, useNavigate } from 'react-router-dom';
import { FirebaseError } from 'firebase/app';
import {
  Error,
  Input,
  Form,
  Switcher,
  Title,
  Wrapper,
} from '../components/auth-components';
import GithubButton from '../components/github-button';
import Nav from '../components/nav';
export default function CreateAccount() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    if (name === 'name') {
      // event가 발생한 name의 이름이 input 속성 name의 값이 서로 일치하는 경우
      setName(value);
    } else if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const [error, setError] = useState('');

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    //console.log(name, email, password);
    if (isLoading || name === '' || email === '' || password === '') return;
    try {
      setLoading(true);

      //🔍 코드 이해하기 : await createUserWithEmailAndPassword(auth, email, password)
      //=== 여기서 auth는 routes의 auth(firebase init 설정)
      //=== email, password는 해당 tsx 파일 내 useState로 받아온 eamil과 비밀번호 const 변수
      const credentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(credentials.user); // 사용자를 생성하고 그 정보를 바로 개발자에게 돌려준다.

      // Firebase는 작은 아바타 이미지의 url을 가지는 미니 프로필을 가지게 됨.
      // 계정 생성 후 사용자 이름을 설정할 수 있도록 페이지 전환
      await updateProfile(credentials.user, {
        displayName: name, // useState로 받은 user가 입력한 name값
      });
      navigate('/'); // 위 작업이 끝나면 사용자를 home화면으로 이동 (위 작업 : 계정생성 => 프로필 업데이트 완료)
    } catch (e) {
      if (e instanceof FirebaseError) {
        //console.log(e.code, e.message);
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
        <Title>Join X</Title>
        <Input
          onChange={onChange}
          name='name'
          value={name}
          placeholder='Name'
          type='text'
          required
        />
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
        <Input type='submit' value={isLoading ? 'Loading' : 'Create Account'} />
      </Form>
      {error !== '' ? <Error>{error}</Error> : null}
      <Switcher>
        Already have an account? <Link to='/login'>Login Go &rarr;</Link>
      </Switcher>
      <GithubButton />
    </Wrapper>
  );
}
