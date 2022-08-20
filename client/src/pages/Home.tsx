import { Link } from 'react-router-dom';
import axios from 'axios';

export const Home = () => {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const name = urlSearchParams.get('name');

  const checkLoginStatus = async () => {
    try {
      const res = await axios.get('http://localhost:4000/api/users/me');

      console.log(res);
    } catch (err) {
      alert(err);
    }
  };
  return (
    <div>
      {name ? <h1>안녕하세요 {name}</h1> : <></>}
      {name ? (
        <>
          <Link to="/logout">로그아웃하기</Link>
          <button onClick={checkLoginStatus}>로그인 확인</button>
        </>
      ) : (
        <Link to="/login">로그인으로 가기</Link>
      )}
    </div>
  );
};
