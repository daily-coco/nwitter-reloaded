import { Navigate } from 'react-router-dom';
import { auth } from '../routes/firebase';
// 로그인한 사용자는 해당 컴포넌트를 볼 수 있음
// 로그인 하지 않은 경우 : 로그인 또는 계정 생성 페이지로 리다이렉션
// 해당 컴포넌트는 Firebase에 유저 정보를 요청하는 용도

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = auth.currentUser;
  // currentUser를 통해서 user 또는 null을 받게 된다.
  if (user === null) {
    // Navigate : user를 다른 곳으로 리다이렉트 해주는 컴포넌트다.
    return <Navigate to='/login' />;
  }
  return children;
}
