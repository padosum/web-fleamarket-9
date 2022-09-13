import { useMemo } from 'react';
import styled from 'styled-components';
import { useSaleItem } from '../../hooks';
import { colors } from '../Color';
import { ItemSkeleton, ProductList } from '../Base';
import { EmptyText } from './Common';

const SalesListWrapper = styled.div`
  width: 100%;
  max-width: 100%;
  max-height: calc(100vh - 107px);
  flex-grow: 1;
  background-color: ${colors.white};
`;

const ListWrapper = styled.div`
  width: 100%;
  max-width: 100%;
  padding: 0 16px;
  box-sizing: border-box;
`;

export const SalesList = () => {
  const { items, isLoading } = useSaleItem();

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
        isLiked: item.isLike,
      };
    });
  }, [items]);

  return (
    <SalesListWrapper>
      {isLoading ? (
        <div style={{ paddingLeft: 16 }}>
          <ItemSkeleton />
          <ItemSkeleton />
          <ItemSkeleton />
        </div>
      ) : products.length > 0 ? (
        <ListWrapper>
          <ProductList items={products} type="sales" />
        </ListWrapper>
      ) : (
        <EmptyText>등록한 상품이 없습니다.</EmptyText>
      )}
    </SalesListWrapper>
  );
};
