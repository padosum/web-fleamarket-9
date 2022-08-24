import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from '../components/Button';
import { BackHeader } from '../components/Header/BackHeader';
import { Spacing } from '../components/Spacing';
import { TypoGraphy } from '../components/TypoGraphy';
import { useAuthContext } from '../context/AuthContext';

interface User {
  idx: number;
  id: string;
  name: string;
}

interface AuthContextValue {
  user: User | null;
  isLoggedIn: boolean;
  login: (user: User) => void;
  logout: () => Promise<boolean>;
}

export const User = () => {
  const navigate = useNavigate();
  const { user, logout }: AuthContextValue = useAuthContext('Login');
  if (!user) {
    return null;
  }

  return (
    <UserWrapper>
      <HeaderWrapper>
        <BackHeader
          title="내 계정"
          color="offWhite"
          onClickBack={() => navigate('/home')}
        ></BackHeader>
      </HeaderWrapper>
      <UserInfo>
        <TypoGraphy.Medium>{user?.name}</TypoGraphy.Medium>
        <Spacing height={20}></Spacing>
        <Button
          bgColor="primary"
          onClick={async () => {
            if (await logout()) {
              navigate('/');
            }
          }}
        >
          로그아웃
        </Button>
      </UserInfo>
    </UserWrapper>
  );
};

const UserWrapper = styled.div`
  width: 100%;
  min-width: 100%;
`;

const HeaderWrapper = styled.div`
  position: sticky;
  top: 0;
  z-index: 9;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px 16px;
`;
