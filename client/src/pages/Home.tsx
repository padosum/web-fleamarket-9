import { Link } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

export const Home = () => {
  const { isLoggedIn, user, logout } = useAuthContext('Home');

  return (
    <div>
      {isLoggedIn && <h1>안녕하세요 {user?.name}</h1>}
      {isLoggedIn ? (
        <button onClick={logout}>로그아웃하기</button>
      ) : (
        <Link to="/login">로그인으로 가기</Link>
      )}
    </div>
  );
};
