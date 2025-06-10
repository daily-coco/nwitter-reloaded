import { useNavigate } from 'react-router-dom';
import { SlArrowLeftCircle } from 'react-icons/sl';
import { AuthTopNav, BackButton } from './auth-components';

export default function Nav() {
  const navigate = useNavigate();
  return (
    <>
      <AuthTopNav>
        <BackButton
          onClick={() => navigate(-1)}
          aria-label='이전 페이지로 이동'
        >
          <SlArrowLeftCircle aria-hidden='true' color='white' />
        </BackButton>
      </AuthTopNav>
    </>
  );
}
