import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BackHeader } from '../components/Header/BackHeader';
import styled from 'styled-components';
import { LocationButton } from '../components/LocationButton';
import { colors } from '../components/Color';
import { Spacing } from '../components/Spacing';
import { useEffect, useState } from 'react';

export const Location = () => {
  const navigate = useNavigate();

  const [location, setLocation] = useState([]);

  const getLocation = async () => {
    try {
      const { data } = await axios.get('/api/location/me');
      setLocation(data);
    } catch (err) {}
  };

  useEffect(() => {
    getLocation();
  }, []);

  const handleDeleteLocation = async (id: number) => {
    if (window.confirm('삭제하시겠습니까?')) {
      try {
        const { data } = await axios.delete(`/api/location/${id}`);
        if (data.count) {
          getLocation();
        }
      } catch (err) {
        alert(err);
      }
    }
  };
  return (
    <LocationWrapper>
      <HeaderWrapper>
        <BackHeader
          title="내 동네 설정하기"
          color="offWhite"
          onClickBack={() => navigate('/home')}
        ></BackHeader>
      </HeaderWrapper>
      <ContentWrapper>
        <Description>
          지역은 최소 1개 이상 최대 2개까지 설정 가능해요.
        </Description>
        <Spacing height={20} />
        <ButtonWrapper>
          {location.map(({ idx, name }: { idx: number; name: string }) => {
            return (
              <LocationButton
                key={idx}
                title={name.split(' ')[2]}
                onClick={(e) => {
                  if (location.length === 1) {
                    if (
                      window.confirm(
                        '동네가 1개만 선택된 상태에서는 삭제를 할 수 없어요. 현재 설정된 동네를 변경하시겠어요?',
                      )
                    ) {
                      navigate('/location/search', { state: idx });
                    }
                    return;
                  }

                  handleDeleteLocation(idx);
                }}
              ></LocationButton>
            );
          })}
          {location.length < 2 && (
            <LocationButton
              onClick={() => navigate('/location/search')}
            ></LocationButton>
          )}
          {location.length === 0 && (
            <LocationButton
              onClick={() => navigate('/location/search')}
            ></LocationButton>
          )}
        </ButtonWrapper>
      </ContentWrapper>
    </LocationWrapper>
  );
};

const LocationWrapper = styled.div`
  width: 100%;
  min-width: 100%;
`;

const HeaderWrapper = styled.div`
  position: sticky;
  top: 0;
  z-index: 9;
`;

const ContentWrapper = styled.div`
  padding: 24px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Description = styled.div`
  color: ${colors.gray1};

  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  min-width: 300px;
  justify-content: space-around;
`;
