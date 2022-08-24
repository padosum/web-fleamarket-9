import axios from 'axios';
import { useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { BackHeader } from '../components/Header/BackHeader';
import { colors } from '../components/Color';
import styled from 'styled-components';
import { TextInput } from '../components/TextInput';
import { Spacing } from '../components/Spacing';
import { Button } from '../components/Button';
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
    <LoginWrapper>
      <HeaderWrapper>
        <BackHeader
          title="로그인"
          color="offWhite"
          onClickBack={() => navigate('/home')}
        ></BackHeader>
      </HeaderWrapper>
      <FormWrapper>
        <form onSubmit={handleSubmit}>
          <TextInput
            placeholder="아이디를 입력하세요"
            name="id"
            value={formValue.id}
            onChange={handleChange}
            height={'40'}
          ></TextInput>
          <Spacing height={20}></Spacing>
          <TextInput
            type="password"
            name="password"
            placeholder="enter a password"
            value={formValue.password}
            onChange={handleChange}
            height={'40'}
          ></TextInput>
          <Spacing height={20}></Spacing>
          <Button>로그인</Button>
        </form>
        <Spacing height={20}></Spacing>
        <GithubLoginButton href={GITHUB_LOGIN_URL}>
          😸 깃허브 로그인
        </GithubLoginButton>
      </FormWrapper>
    </LoginWrapper>
  );
};

const LoginWrapper = styled.div`
  width: 100%;
  min-width: 100%;
`;

const HeaderWrapper = styled.div`
  position: sticky;
  top: 0;
  z-index: 9;
`;

const FormWrapper = styled.div`
  padding: 24px 16px;
`;

const GithubLoginButton = styled.a`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 42px;
  background-color: ${colors.titleActive};
  color: ${colors.white};

  border-radius: 8px;
`;
