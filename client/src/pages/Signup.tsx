import axios from 'axios';
import { useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { BackHeader } from '../components/Header/BackHeader';
import styled from 'styled-components';
import { TextInput } from '../components/TextInput';
import { Spacing } from '../components/Spacing';
import { Button } from '../components/Button';
export const Signup = () => {
  const navigate = useNavigate();
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
          title="회원가입"
          color="offWhite"
          onClickBack={() => navigate(-1)}
        ></BackHeader>
      </HeaderWrapper>
      <TitleWrapper>
        <Title>우아 마켙</Title>
      </TitleWrapper>
      <FormWrapper>
        <form onSubmit={handleSubmit}>
          아이디
          <TextInput
            placeholder="아이디를 입력하세요"
            name="id"
            value={formValue.id}
            onChange={handleChange}
            height={'40'}
          ></TextInput>
          <Spacing height={20}></Spacing>
          비밀번호
          <TextInput
            type="password"
            name="password"
            placeholder="비밀번호를 입력하세요"
            value={formValue.password}
            onChange={handleChange}
            height={'40'}
          ></TextInput>
          <Spacing height={20}></Spacing>
          <Button>회원가입</Button>
        </form>
      </FormWrapper>
    </LoginWrapper>
  );
};

const TitleWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Title = styled.h1`
  font-family: 'UhBeeHam', sans-serif;
`;

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
