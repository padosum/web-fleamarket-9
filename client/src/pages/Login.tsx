import axios from 'axios';
import { useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
export const Login = () => {
  const navigate = useNavigate();
  const GITHUB_LOGIN_URL = `${process.env.REACT_APP_DATA_API}api/auth/github`;
  const { login, isLoggedIn, user, logout } = useAuthContext('Login');
  const [formValue, setFormValue] = useState({
    id: '',
    password: '',
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        '/api/auth/login',
        { id: formValue.id, password: formValue.password },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        },
      );
      login(data);
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };
  const handleChange = (event: any) => {
    setFormValue({
      ...formValue,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div>
      <h1>login</h1>
      <form onSubmit={handleSubmit}>
        아이디
        <input
          type="text"
          name="id"
          placeholder="enter an email"
          value={formValue.id}
          onChange={handleChange}
        />
        비밀번호
        <input
          type="password"
          name="password"
          placeholder="enter a password"
          value={formValue.password}
          onChange={handleChange}
        />
        <button type="submit">그냥 로그인</button>
      </form>
      <a href={GITHUB_LOGIN_URL}>😸 깃허브 로그인</a>
    </div>
  );
};
