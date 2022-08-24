import { useState } from 'react';
import styled from 'styled-components';
import { CategorySlide } from '../components/Category/CategorySlide';
import { Dropdown } from '../components/Dropdown';
import { Fab } from '../components/Fab';
import { MainHeader } from '../components/Header/MainHeader';
import { ProductList } from '../components/ProductList';

const HomeWrapper = styled.div`
  width: 100%;
  max-width: 100%;
`;

const ProductWrapper = styled.div`
  padding: 0 16px;
`;

const HeaderWrapper = styled.div`
  position: sticky;
  top: 0;
  z-index: 9;
`;

const FabButtonWrapper = styled.div`
  position: fixed;
  right: 16px;
  bottom: 16px;
`;

const location = [
  { idx: 1, name: '방이동' },
  { idx: 99999, name: '내 동네 설정하기' },
];

const products = [
  {
    idx: 1,
    title: '파랑 선풍기',
    location: '방이동',
    timestamp: '3시간 전',
    price: 59000,
    likeCnt: 1,
    messageCnt: 1,
  },
  {
    idx: 2,
    title: '카멜 브라운 스카프 팝니당당',
    location: '방이동',
    timestamp: '3시간 전',
    price: 59000,
    likeCnt: 1,
    messageCnt: 1,
  },
  {
    idx: 3,
    title: '아이폰',
    location: '방이동',
    timestamp: '3시간 전',
    price: 59000,
    likeCnt: 0,
    messageCnt: 0,
  },
  {
    idx: 4,
    title: '신발',
    location: '방이동',
    timestamp: '3시간 전',
    price: 59000,
    likeCnt: 0,
    messageCnt: 0,
  },
  {
    idx: 5,
    title: '아이폰',
    location: '방이동',
    timestamp: '3시간 전',
    price: 59000,
    likeCnt: 0,
    messageCnt: 0,
  },
  {
    idx: 6,
    title: '아이폰',
    location: '방이동',
    timestamp: '3시간 전',
    price: 59000,
    likeCnt: 0,
    messageCnt: 0,
  },
  {
    idx: 7,
    title: '아이폰',
    location: '방이동',
    timestamp: '3시간 전',
    price: 59000,
    likeCnt: 0,
    messageCnt: 0,
  },
  {
    idx: 8,
    title: '아이폰',
    location: '방이동',
    timestamp: '3시간 전',
    price: 59000,
    likeCnt: 0,
    messageCnt: 0,
  },
  {
    idx: 9,
    title: '아이폰',
    location: '방이동',
    timestamp: '3시간 전',
    price: 59000,
    likeCnt: 0,
    messageCnt: 0,
  },
];

export const Home = () => {
  const [openLocation, setOpenLocation] = useState(false);
  const [openCategory, setOpenCategory] = useState(false);

  const handleToggleCategory = () => {
    setOpenCategory((prevOpenCategory) => !prevOpenCategory);
  };
  return (
    <HomeWrapper>
      <HeaderWrapper>
        <MainHeader
          color={'primary'}
          onClickCategory={handleToggleCategory}
          onClickMap={() =>
            setOpenLocation((prevOpenLocation) => !prevOpenLocation)
          }
          onClickUser={() => console.log('clickUser')}
          onClickMenu={() => console.log('clickMenu')}
        ></MainHeader>
        {openLocation && (
          <Dropdown
            items={location}
            select={0}
            handleChange={() => {}}
            left={'100'}
          ></Dropdown>
        )}
      </HeaderWrapper>

      <CategorySlide
        open={openCategory}
        toggleOpen={handleToggleCategory}
      ></CategorySlide>

      <ProductWrapper>
        <ProductList items={products} type="sales" />
      </ProductWrapper>
      <FabButtonWrapper>
        <Fab />
      </FabButtonWrapper>
    </HomeWrapper>
  );
};
