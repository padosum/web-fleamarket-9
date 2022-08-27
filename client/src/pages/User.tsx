import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from '../components/Button';
import { BackHeader } from '../components/Header/BackHeader';
import { Icon } from '../components/Icon';
import { Spacing } from '../components/Spacing';
import { TypoGraphy } from '../components/TypoGraphy';
import { useAuthContext } from '../context/AuthContext';

interface Location {
  userId: number;
  locationId: number;
  locationName: string;
  locationCode: string;
}

interface User {
  idx: number;
  id: string;
  name: string;
  location: Location[];
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
          onClickBack={() => navigate(-1)}
        ></BackHeader>
      </HeaderWrapper>
      <UserInfo>
        <TypoGraphy.Medium>{user?.name}</TypoGraphy.Medium>
        <Spacing height={20}></Spacing>

        {user?.location.length !== 0 && (
          <>
            <LocationWrapper>
              <Icon name="iconMap"></Icon>
              <span style={{ width: '5px' }}></span>
              {user?.location.map((item, idx) => {
                return (
                  <span key={item.locationId}>
                    {(idx !== 0 ? ', ' : '') + item.locationName.split(' ')[2]}
                  </span>
                );
              })}
            </LocationWrapper>
            <Spacing height={50}></Spacing>
          </>
        )}

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

const LocationWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
