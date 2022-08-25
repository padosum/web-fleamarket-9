import styled from 'styled-components';
import { colors } from '../Color';
import { ProductList } from '../ProductList';
import { EmptyText } from './Common';

const LikedListWrapper = styled.div`
  width: 100%;
  flex-grow: 1;
  max-height: calc(100vh - 107px);
  background-color: ${colors.white};
`;

const ListWrapper = styled.div`
  width: 100%;
  max-width: 100%;
  padding: 0 16px;
  box-sizing: border-box;
`;

const products = [
  {
    idx: 1,
    title: '파랑 선풍기',
    location: '방이동',
    timestamp: '3시간 전',
    price: 59000,
    likeCnt: 1,
    messageCnt: 1,
    image: '',
    isLiked: false,
  },
  {
    idx: 2,
    title: '카멜 브라운 스카프 팝니당당',
    location: '방이동',
    timestamp: '3시간 전',
    price: 59000,
    likeCnt: 1,
    messageCnt: 1,
    image: '',
    isLiked: false,
  },
  {
    idx: 3,
    title: '아이폰',
    location: '방이동',
    timestamp: '3시간 전',
    price: 59000,
    likeCnt: 0,
    messageCnt: 0,
    image: '',
    isLiked: false,
  },
  {
    idx: 4,
    title: '신발',
    location: '방이동',
    timestamp: '3시간 전',
    price: 59000,
    likeCnt: 0,
    messageCnt: 0,
    image: '',
    isLiked: false,
  },
  {
    idx: 5,
    title: '아이폰',
    location: '방이동',
    timestamp: '3시간 전',
    price: 59000,
    likeCnt: 0,
    messageCnt: 0,
    image: '',
    isLiked: false,
  },
  {
    idx: 6,
    title: '아이폰',
    location: '방이동',
    timestamp: '3시간 전',
    price: 59000,
    likeCnt: 0,
    messageCnt: 0,
    image: '',
    isLiked: false,
  },
  {
    idx: 7,
    title: '아이폰',
    location: '방이동',
    timestamp: '3시간 전',
    price: 59000,
    likeCnt: 0,
    messageCnt: 0,
    image: '',
    isLiked: false,
  },
  {
    idx: 8,
    title: '아이폰',
    location: '방이동',
    timestamp: '3시간 전',
    price: 59000,
    likeCnt: 0,
    messageCnt: 0,
    image: '',
    isLiked: false,
  },
  {
    idx: 9,
    title: '아이폰',
    location: '방이동',
    timestamp: '3시간 전',
    price: 59000,
    likeCnt: 0,
    messageCnt: 0,
    image: '',
    isLiked: false,
  },
];

export const LikedList = () => {
  return (
    <LikedListWrapper>
      {products.length > 0 && (
        <ListWrapper>
          <ProductList items={products} type="shopping" />
        </ListWrapper>
      )}

      {products.length === 0 && (
        <EmptyText>관심을 표시한 상품이 없습니다.</EmptyText>
      )}
    </LikedListWrapper>
  );
};
