import React from 'react';
import styled from 'styled-components';
import { InfoSaler, ProductBar, Spacing, TypoGraphy } from '../components/Base';
import { colors } from '../components/Color';
import { InvisibleHeader } from '../components/Header/InvisibleHeader';
import { ItemDetailTypes } from '../remotes/item/fetch-item-detail';
import { elapsedTime } from '../utils/util';

export const Detail = ({ item }: { item?: ItemDetailTypes }) => {
  if (!item) return null;

  return (
    <DetailWrapper>
      <>
        <HeaderWrapper>
          <InvisibleHeader onClickBack={() => {}} />
        </HeaderWrapper>

        <BodyWrapper>
          <Spacing height={320} />
          <ContentWrapper>
            <Spacing height={16}></Spacing>
            <TypoGraphy.Large>{item.title}</TypoGraphy.Large>
            <DataWrapper>
              <span>{item.categoryName}</span>
              <span>·{elapsedTime(item.updatedAt)}</span>
            </DataWrapper>
            <DescriptionWrapper>{item.contents}</DescriptionWrapper>
            <DataWrapper>
              채팅 {item.chatRoomCount}·관심 {item.likeCount}·조회{' '}
              {item.viewCount}
            </DataWrapper>
            <InfoSaler
              location={item.location}
              username={item.sellerName}
            ></InfoSaler>
          </ContentWrapper>
        </BodyWrapper>
        <FooterWrapper>
          <HorizontalBar />
          <ProductBar
            price={item.price ? Number(item.price).toLocaleString() : ''}
            Button={<></>}
          />
        </FooterWrapper>
      </>
    </DetailWrapper>
  );
};

const DetailWrapper = styled.div`
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
`;

const BodyWrapper = styled.div`
  box-sizing: border-box;

  position: fixed;
  top: 0;
  left: 0;
  overflow-y: auto;
  width: 100%;
  height: 100vh;
`;

const ContentWrapper = styled.div`
  padding: 24px 16px 116px 16px;
`;

const DataWrapper = styled.div`
  color: ${colors.gray1};
  font-size: 12px;
  line-height: 16px;

  margin-top: 8px;
  margin-bottom: 16px;
`;

const DescriptionWrapper = styled.div`
  color: ${colors.titleActive};
  font-size: 16px;
  line-height: 24px;
  word-break: keep-all;
  word-wrap: break-word;
  margin: 16px 0;
  white-space: pre-wrap;
`;
const HorizontalBar = styled.div`
  height: 1px;
  width: 100%;
  background-color: ${colors.gray3};
`;

const FooterWrapper = styled.div`
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
`;
