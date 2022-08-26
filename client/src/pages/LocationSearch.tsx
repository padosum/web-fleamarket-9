import axios, { AxiosResponse } from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import React, { useEffect, useRef, useState } from 'react';
import { SearchHeader } from '../components/Header/SearchHeader';
import { colors } from '../components/Color';
import { debounce } from '../utils/util';

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

  const debounceSearch = debounce(getLocation, 200);

  useEffect(() => {}, []);

  const handleChangeSearchLocation = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const name = e.target.value;
    if (name.trim() === '') {
      setSearchLocation([]);
      return;
    }

    debounceSearch(name);
  };

  const requestAddLocationToUser = async (locationId: number) => {
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

  const handleSelectLocation = async (locationId: number) => {
    // 삭제할 동네가 있는 경우 삭제 우선처리
    if (state) {
      try {
        const { data } = await axios.delete(`/api/location/${state}`);
        if (data.count) {
          requestAddLocationToUser(locationId);
        }
      } catch (err) {
        alert(err);
      }
    } else {
      requestAddLocationToUser(locationId);
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

  const highlightedText = (text: string, query: string) => {
    if (query !== '' && text.includes(query)) {
      const parts = text.split(new RegExp(`(${query})`, 'gi'));

      return (
        <>
          {parts.map((part, index) =>
            part === query ? <span key={index}>{part}</span> : part,
          )}
        </>
      );
    }

    return text;
  };

  const nameEl = formEl.current?.elements[0] as HTMLInputElement;

  return (
    <LocationWrapper onSubmit={handleSubmit} ref={formEl}>
      <HeaderWrapper>
        <SearchHeader
          title="동네 검색하기"
          color="offWhite"
          onClickBack={() => navigate('/location')}
          onChange={handleChangeSearchLocation}
          placeholder="동명(읍, 면)으로 검색 (ex. 방이동)"
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
                  {highlightedText(name, nameEl.value)}
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
  align-items: center;
  width: 100%;
  height: 72px;
  font-weight: 500;
  background: ${colors.white};
  box-sizing: border-box;
  border-bottom: 1px solid ${colors.gray3};

  cursor: pointer;

  span {
    color: ${colors.primary};
    display: contents;
    font-weight: 400;
  }
`;
