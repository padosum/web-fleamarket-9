import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks';
import { BackHeader } from '../components/Header/BackHeader';
import { colors } from '../components/Color';
import styled from 'styled-components';
import { Button, Icon, Spacing } from '../components/Base';
import { TypoGraphy } from '../components/Base';
import Form from '../context/FormContext';
import ErrorMessage from '../components/Form/ErrorMessage';
import Field from '../components/Form/Field';
import Api from '../utils/api';
import { UserType } from '../types/user';

type InputValue = {
  [key: string]: string;
};

export const Login = () => {
  const navigate = useNavigate();
  const GITHUB_LOGIN_URL = `${process.env.REACT_APP_DATA_API}api/auth/github`;
  const { login } = useAuthContext('Login');

  const validate = ({ id, password }: InputValue): InputValue => {
    const errors = {
      id: '',
      password: '',
    };

    if (!id) {
      errors.id = '아이디를 입력하세요';
    }
    if (!password) {
      errors.password = '비밀번호를 입력하세요';
    }

    return errors;
  };

  const handleSubmit = async (values: InputValue) => {
    try {
      const data: UserType = await Api.post({
        url: '/api/auth/login',
        data: { id: values.id, password: values.password },
      });
      login(data);
      navigate('/home');
    } catch (err) {
      alert('가입 정보가 없습니다.');
    }
  };

  return (
    <LoginWrapper>
      <HeaderWrapper>
        <BackHeader
          title="로그인"
          color="offWhite"
          onClickBack={() => navigate(-1)}
        ></BackHeader>
      </HeaderWrapper>
      <TitleWrapper>
        <Title>우아 마켙</Title>
      </TitleWrapper>
      <FormWrapper>
        <Form
          initialValues={{ id: '', password: '' }}
          validate={validate}
          onSubmit={handleSubmit}
        >
          <Field name="id" placeholder="아이디를 입력하세요"></Field>
          <ErrorMessage name="id" />
          <Spacing height={20}></Spacing>
          <Field
            type="password"
            name="password"
            placeholder="비밀번호를 입력하세요"
          ></Field>
          <ErrorMessage name="password" />
          <Spacing height={20}></Spacing>
          <Button>로그인</Button>
        </Form>
        <Spacing height={20}></Spacing>
        <GithubLoginButton href={GITHUB_LOGIN_URL}>
          <Icon name="iconGithub" fill="white" />
          <span style={{ marginLeft: '10px' }}>깃허브 로그인</span>
        </GithubLoginButton>
        <Spacing height={30}></Spacing>
        <SignupWrapper>
          <TypoGraphy.SmallLink to="/signup">회원가입</TypoGraphy.SmallLink>
        </SignupWrapper>
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

const SignupWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
