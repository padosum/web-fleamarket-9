import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks';
import styled from 'styled-components';
import { BackHeader } from '../components/Header/BackHeader';
import { Button, Spacing } from '../components/Base';
import Form from '../context/FormContext';
import Field from '../components/Form/Field';
import ErrorMessage from '../components/Form/ErrorMessage';
import Api from '../utils/api';
import { UserType } from '../types/user';

type SignupResponse<T> = Omit<T, 'location'> & {
  message: string;
};

type InputValue = {
  [key: string]: string;
};

const isValidId = (inputId: string) => {
  var regExp = /^[a-z]+[a-z0-9]{5,19}$/g;

  return regExp.test(inputId);
};

const validate = ({ id, password, name }: InputValue): InputValue => {
  const errors = {
    id: '',
    password: '',
    name: '',
  };

  if (!id) {
    errors.id = '아이디를 입력하세요';
  }
  if (!password) {
    errors.password = '비밀번호를 입력하세요';
  }
  if (!name) {
    errors.name = '이름을 입력하세요';
  }

  if (!isValidId(id)) {
    errors.id = '아이디는 영문, 숫자 조합 6자 이상 20자이하여야 합니다.';
  }

  return errors;
};

export const Signup = () => {
  const navigate = useNavigate();
  const { login } = useAuthContext('Login');

  const handleSubmit = async (values: InputValue) => {
    try {
      const data: SignupResponse<UserType> = await Api.post({
        url: '/api/users',
        data: { id: values.id, password: values.password, name: values.name },
      });

      if (data.message) {
        alert(data.message);
        return;
      }

      const loginResponse: UserType = await Api.post({
        url: '/api/auth/login',
        data: { id: values.id, password: values.password },
      });

      login(loginResponse);
      navigate('/home');
    } catch (err) {
      alert(err);
    }
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
        <Form
          initialValues={{ id: '', password: '', name: '' }}
          validate={validate}
          onSubmit={handleSubmit}
        >
          아이디
          <Field
            name="id"
            placeholder="영문, 숫자 조합 6자 이상 20자 이하"
            autocomplete="off"
          ></Field>
          <ErrorMessage name="id" />
          <Spacing height={20}></Spacing>
          비밀번호
          <Field
            type="password"
            name="password"
            placeholder="비밀번호를 입력하세요"
            autocomplete="off"
          ></Field>
          <ErrorMessage name="password" />
          <Spacing height={20}></Spacing>
          이름
          <Field
            type="text"
            name="name"
            placeholder="이름을 입력하세요"
            autocomplete="off"
          ></Field>
          <ErrorMessage name="name" />
          <Spacing height={20}></Spacing>
          <Button>회원가입</Button>
        </Form>
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
