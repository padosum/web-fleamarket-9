import axios, { AxiosResponse } from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import React, { useEffect, useRef, useState } from 'react';
import { SearchHeader } from '../components/Header/SearchHeader';
import { colors } from '../components/Color';

export const LocationSearch = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const formEl = useRef<HTMLFormElement>(null);

  const [searchLocation, setSearchLocation] = useState([]);

  const getLocation = async (searchName: string) => {
    try {
      const { data } = await axios.get('/api/location', {
        params: { name: searchName },
      });
      setSearchLocation(data);
    } catch (err) {}
  };

  useEffect(() => {
    getLocation('방');
  }, []);

  const handleSelectLocation = async (locationId: number) => {
    const res: void | AxiosResponse<any, any> = await axios
      .post(
        '/api/location',
        { locationId },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        },
      )
      .catch((err) => {
        if (err.response) {
          alert(err.response.data.message);
        }
      });

    if (!res) {
      return;
    }

    if (res.data.idx) {
      navigate('/location');
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const nameEl = formEl.current?.elements[0] as HTMLInputElement;
    if (!nameEl) {
      return;
    }
    if (nameEl.value === '') {
      return;
    }
    getLocation(nameEl.value);
  };

  return (
    <LocationWrapper onSubmit={handleSubmit} ref={formEl}>
      <HeaderWrapper>
        <SearchHeader
          title="동네 검색하기"
          color="offWhite"
          onClickBack={() => navigate('/home')}
        ></SearchHeader>
      </HeaderWrapper>
      <ContentWrapper>
        <LocationList>
          {searchLocation.map(
            ({ idx, name }: { idx: number; name: string }) => {
              return (
                <LocationItem
                  key={idx}
                  onClick={() => handleSelectLocation(idx)}
                >
                  {name}
                </LocationItem>
              );
            },
          )}
        </LocationList>
      </ContentWrapper>
    </LocationWrapper>
  );
};

const LocationWrapper = styled.form`
  width: 100%;
  min-width: 100%;
`;

const HeaderWrapper = styled.div`
  position: sticky;
  top: 0;
  z-index: 9;
`;

const ContentWrapper = styled.div`
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LocationList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: space-around;
`;

const LocationItem = styled.div`
  display: flex;
  width: 100%;
  height: 72px;
  justify-content: space-between;
  align-items: center;
  background: ${colors.white};
  box-sizing: border-box;
  border-bottom: 1px solid ${colors.gray3};

  cursor: pointer;
`;
