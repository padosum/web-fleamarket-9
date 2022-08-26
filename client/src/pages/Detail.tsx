import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from '../components/Button';
import { colors } from '../components/Color';
import { InvisibleHeader } from '../components/Header/InvisibleHeader';
import { ImgBox } from '../components/ImgBox';
import { InfoSaler } from '../components/InfoSaler';
import { ProductBar } from '../components/ProductBar';
import { Spacing } from '../components/Spacing';
import { StatusButton } from '../components/StatusButton';
import { TypoGraphy } from '../components/TypoGraphy';
import { useAuthContext } from '../context/AuthContext';
import { useItemDetail } from '../hooks/useItemDetail';
import { elapsedTime } from '../utils/util';

const status = [
  { idx: 1, name: '판매중' },
  { idx: 2, name: '예약중' },
  { idx: 3, name: '판매완료' },
];

export const Detail = () => {
  const { id } = useParams();

  const { item }: { item: any } = useItemDetail(id);

  const [currentStatus, setCurrentStatus] = useState(item.status | 1);
  const [openStatus, setOpenStatus] = useState(false);
  const [like, setLike] = useState(item.isLike);

  useEffect(() => {
    if (item.constructor === Object && Object.keys(item).length === 0) {
    } else {
      setLike(item.isLike);
      setCurrentStatus(item.status);
    }
  }, [item]);

  const handleStatusToggle = (e: React.MouseEvent<HTMLDivElement>) => {
    setOpenStatus((prevOpenStatus) => !prevOpenStatus);
  };

  const handleStatusChange = (num: number) => {
    try {
      axios.patch(`/api/item/status/${id}`, {
        statusId: num,
      });
    } catch (err) {
      console.log(err);
    }
    setOpenStatus((prevOpenStatus) => !prevOpenStatus);
    setCurrentStatus(num);
  };

  const handleClickLike = async (e: React.MouseEvent<HTMLDivElement>) => {
    if (item.isLike) {
      axios.patch(`/api/item/unlike/${id}`);
    } else {
      axios.patch(`/api/item/like/${id}`);
    }

    setLike((prevLike: any) => !prevLike);
  };

  const { user } = useAuthContext('Detail');

  const navigate = useNavigate();

  if (!id) {
    return null;
  }

  const owner = user?.idx === item.seller;
  return (
    <DetailWrapper>
      <HeaderWrapper>
        <InvisibleHeader
          onClickBack={() => navigate('/home')}
          onClickMore={() => {}}
          visibleMore={owner}
        />
      </HeaderWrapper>

      <BodyWrapper>
        <ImgBox.Gradient height={320} src={item.images}></ImgBox.Gradient>

        <ContentWrapper>
          {owner && (
            <StatusButton
              status={status}
              select={currentStatus}
              open={openStatus}
              handleToggle={handleStatusToggle}
              handleChange={handleStatusChange}
            ></StatusButton>
          )}
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
          onLikeClick={handleClickLike}
          isLiked={like}
          price={Number(item.price).toLocaleString()}
          Button={
            <Button size="md">
              {owner
                ? `채팅${
                    item.chatRoomCount > 0 ? ` (${item.chatRoomCount})` : ''
                  }`
                : '문의하기'}
            </Button>
          }
        />
      </FooterWrapper>
    </DetailWrapper>
  );
};

const TestWrapper = styled.div`
  width: 100%;
  background-color: 'red';
`;
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
  margin: 16px 0;
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
