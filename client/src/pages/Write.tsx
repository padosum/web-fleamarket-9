import axios, { AxiosError } from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Navigate, useMatch, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { CategoryButton } from '../components/Category/CategoryButton';
import { colors } from '../components/Color';
import { WriteHeader } from '../components/Header/WriteHeader';
import { ImgButton } from '../components/ImgButton';
import { LocationBar } from '../components/LocationBar';
import { Spacing } from '../components/Spacing';
import { TextInput } from '../components/TextInput';
import { toast } from '../components/ToastMessageContainer';
import { useAuthContext } from '../context/AuthContext';
import { useWorker } from '../context/WorkerContext';
import { useCategory } from '../hooks/useCategory';
import { useIsLoggedIn } from '../hooks/useIsLoggedIn';
import { comma } from '../utils/util';

const WriteWrapper = styled.div`
  width: 100%;
  max-width: 100%;

  @supports (-webkit-touch-callout: none) {
    max-height: -webkit-fill-available;
  }

  box-sizing: border-box;
`;

const HeaderWrapper = styled.div`
  position: sticky;
  width: 100%;
  z-index: 9;
  top: 0;
  border-bottom: 1px solid ${colors.gray3};
`;

const BodyWrapper = styled.div`
  padding: 0 16px;
  box-sizing: border-box;
`;

const ImgWrap = styled.div`
  display: flex;
  max-width: 100%;
  padding: 24px 0;
  width: 100%;
  box-sizing: border-box;
  overflow: auto;
`;

const HorizontalBar = styled.div`
  height: 1px;
  width: 100%;
  background-color: ${colors.gray3};
`;

const HorizontalSpacing = styled.div<{ width: number }>`
  width: ${({ width }) => `${width}px`};
  min-width: ${({ width }) => `${width}px`};
`;

const LocationWrapper = styled.div`
  height: 36px;
  width: 100%;
  max-width: 100%;
  overflow: hidden;
`;

const CategoryWrapper = styled.div`
  width: 100%;
  max-width: 100%;
  overflow: auto;
`;

export const Write = () => {
  const { state }: { state: any } = useLocation();

  const match = useMatch('/item/edit/:id');
  const itemId = match?.params.id;

  const [info, setInfo] = useState({
    imgUrls: [] as string[],
    title: '',
    price: '',
    contents: '',
    location: '잠실',
    category: 0,
    locationId: state?.locationId || 0,
  });

  const { title, price, contents } = info;

  const isLoggedIn = useIsLoggedIn();
  const { user } = useAuthContext('Write');
  const fileInputRef = useRef<HTMLInputElement>(null!);
  const { category } = useCategory();

  const onFileInputChange = async (
    evt: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = evt.currentTarget.files;

    if (files?.length) {
      const img = files[0];
      evt.currentTarget.value = '';
      const formData = new FormData();
      formData.append('file', img);
      const res = await axios.post('/api/image', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const { url } = res.data;

      setInfo({ ...info, imgUrls: [...info.imgUrls, url] });
    }
  };

  const navigate = useNavigate();

  const onInputTextChange = (
    type: string,
    evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    switch (type) {
      case 'title':
      case 'contents':
        setInfo({ ...info, [type]: evt.target.value });
        break;
      case 'price':
        setInfo({
          ...info,
          [type]: comma(evt.target.value),
        });
        break;
      case 'category':
        setInfo({ ...info, [type]: +evt.target.value });
    }
  };

  const onImageAddClick = () => {
    fileInputRef.current.click();
  };

  const onImageDeleteClick = (url: string) => {
    setInfo({
      ...info,
      imgUrls: info.imgUrls.filter((imgUrl) => imgUrl !== url),
    });
  };

  const checkValidation = () => {
    return !!(
      info.imgUrls.length > 0 &&
      info.title &&
      info.contents &&
      info.location &&
      info.category > 0
    );
  };

  const onSubmit = async (evt?: React.FormEvent) => {
    evt?.preventDefault();

    if (!checkValidation()) return;

    try {
      if (!itemId) {
        await axios.post('/api/item', {
          title: info.title,
          images: info.imgUrls,
          price: info.price ? +info.price.replace(/,/g, '') : 0,
          contents: info.contents,
          code: state.locationName,
          locationId: state.locationId,
          category: info.category,
        });

        alert('물품을 등록했습니다.');
        navigate('/home');
      }

      if (itemId) {
        await axios.patch(`/api/item/${itemId}`, {
          title: info.title,
          images: info.imgUrls,
          price: +info.price.replace(/,/g, ''),
          contents: info.contents,
          code: info.location,
          locationId: info.locationId,
          category: info.category,
        });

        alert('물품을 수정했습니다.');
        navigate('/home');
      }
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        alert(err!.response!.data.message);
      }
    }
  };

  const getItemDetail = async () => {
    const res = await axios.get(`/api/item/${itemId}`);
    const { data: info } = res;

    setInfo({
      title: info.title,
      category: info.category,
      contents: info.contents,
      imgUrls: info.images.split(','),
      location: info.location,
      locationId: info.locationId,
      price: comma(info.price),
    });
  };

  useEffect(() => {
    if (itemId) {
      getItemDetail();
    }
  }, [itemId]);

  return (
    <form onSubmit={onSubmit}>
      {!isLoggedIn && <Navigate to="/home" replace />}
      {isLoggedIn && user?.location.length === 0 && (
        <Navigate to="/location" replace />
      )}
      <WriteWrapper>
        <HeaderWrapper>
          <WriteHeader
            title={'글쓰기'}
            color={'white'}
            active={checkValidation()}
            onClickBack={() => navigate('/home')}
            onClickCheck={onSubmit}
          />
        </HeaderWrapper>

        <input
          type="file"
          onChange={onFileInputChange}
          ref={fileInputRef}
          style={{ display: 'none' }}
          accept="image/*"
        />

        <ImgWrap>
          <HorizontalSpacing width={16} />
          <ImgButton.Add
            onClick={onImageAddClick}
            text={`${info.imgUrls.length}/10`}
          />
          {info.imgUrls.map((imgUrl) => {
            return [
              <HorizontalSpacing key={'space' + imgUrl} width={16} />,
              <ImgButton.Delete
                onClick={onImageDeleteClick.bind(null, imgUrl)}
                key={'img' + imgUrl}
                src={imgUrl}
              />,
            ];
          })}
          <HorizontalSpacing width={16} />
        </ImgWrap>

        <BodyWrapper>
          <HorizontalBar />
          <Spacing height={24} />
          <TextInput.NoBorder
            onChange={onInputTextChange.bind(null, 'title')}
            placeholder="글 제목"
            maxLength={30}
          />
          {title && (
            <>
              <Spacing height={5} />
              <CategoryWrapper className="no-scroll">
                <CategoryButton
                  initialCategory={info.category}
                  categories={category}
                  onChange={onInputTextChange.bind(null, 'category')}
                />
              </CategoryWrapper>
            </>
          )}

          <Spacing height={24} />
          <HorizontalBar />
          <Spacing height={24} />
          <TextInput.NoBorder
            onChange={onInputTextChange.bind(null, 'price')}
            value={price ? '₩ ' + price : ''}
            placeholder="₩ 가격(선택사항)"
            maxLength={15}
          />
          <Spacing height={24} />
          <HorizontalBar />
          <Spacing height={24} />
          <TextInput.TextArea
            onChange={onInputTextChange.bind(null, 'contents')}
            value={contents}
            placeholder="게시글 내용을 작성해주세요."
            height={150}
            maxLength={500}
          />
          <Spacing height={48} />
        </BodyWrapper>
        <HorizontalBar />
        <LocationWrapper>
          <LocationBar location={itemId ? info.location : state.locationName} />
        </LocationWrapper>
      </WriteWrapper>
    </form>
  );
};
