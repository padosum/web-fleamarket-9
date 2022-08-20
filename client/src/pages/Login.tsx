import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const CLIENT_ID = '3ae020d32550b21da1fe';
  const REDIRECT_URL = `http://localhost:3000/login`;
  // const GITHUB_LOGIN_URL = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL}`;
  const GITHUB_LOGIN_URL = `http://localhost:4000/api/auth/github`;
  const urlSearchParams = new URLSearchParams(window.location.search);
  const code = urlSearchParams.get('code');
  const password = Math.random();
  const navigate = useNavigate();

  const loginUsingGithubOAuth = async () => {
    try {
      const res = await axios.get('http://localhost:4000/api/auth/github');

      const { name } = res.data.user;

      navigate(`/?name=${name}`, { replace: true });
    } catch (err) {
      alert(err);
    }
  };

  useEffect(
    function () {
      if (code) {
        loginUsingGithubOAuth();
      }
    },
    [code],
  );

  return (
    <div>
      <h1>login</h1>
      <h1>{code}</h1>
      {/* <button onClick={loginUsingGithubOAuth}>github 로그인</button> */}
      <a href="http://localhost:4000/api/auth/github">깃허브 로그인</a>
    </div>
  );
};
