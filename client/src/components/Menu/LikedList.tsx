import { useMemo } from 'react';
import styled from 'styled-components';
import { useLikedItem } from '../../hooks';
import { colors } from '../Color';
import { ItemSkeleton, ProductList } from '../Base';
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

export const LikedList = () => {
  const { items, isLoading } = useLikedItem();

  const products = useMemo(() => {
    return items.map((item) => {
      return {
        idx: item.idx,
        title: item.title,
        location: item.location,
        timestamp: item.updatedAt,
        price: item.price,
        likeCnt: item.likeCount,
        messageCnt: item.chatRoomCount,
        image: item.image,
        thumbnail: item.thumbnail,
        isLiked: item.isLike,
      };
    });
  }, [items]);

  return (
    <LikedListWrapper>
      {isLoading ? (
        <div style={{ paddingLeft: 16 }}>
          <ItemSkeleton />
          <ItemSkeleton />
          <ItemSkeleton />
        </div>
      ) : products.length > 0 ? (
        <ListWrapper>
          <ProductList items={products} type="shopping" />
        </ListWrapper>
      ) : (
        <EmptyText>관심을 표시한 상품이 없습니다.</EmptyText>
      )}
    </LikedListWrapper>
  );
};
