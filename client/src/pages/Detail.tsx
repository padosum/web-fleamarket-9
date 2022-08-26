import axios, { AxiosError } from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from '../components/Button';
import { colors } from '../components/Color';
import { Dropdown } from '../components/Dropdown';
import { InvisibleHeader } from '../components/Header/InvisibleHeader';
import { ImageSlide } from '../components/ImageSlide';
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

interface DropdownItem {
  idx: number;
  name: string;
  color?: keyof typeof colors;
}

const dropdownItems: DropdownItem[] = [
  { idx: 1, name: '수정하기' },
  { idx: 99999, name: '삭제하기', color: 'red' },
];

export const Detail = () => {
  const { id } = useParams();

  const { item }: { item: any } = useItemDetail(id);

  const [currentStatus, setCurrentStatus] = useState(item.status | 1);
  const [openStatus, setOpenStatus] = useState(false);
  const [like, setLike] = useState(item.isLike);
  const [openMore, setOpenMore] = useState(false);

  const { user, isLoggedIn } = useAuthContext('Detail');
  const navigate = useNavigate();
  const itemMoreRef = useRef<HTMLDivElement>(null!);
  const itemStatusDropdownRef = useRef<HTMLDivElement>(null!);
  const itemStatusRef = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    if (item.constructor === Object && Object.keys(item).length === 0) {
    } else {
      setLike(item.isLike);
      setCurrentStatus(item.status);
    }
  }, [item]);

  // useEffect(() => {
  //   const outsideClickHandler = (evt: MouseEvent) => {
  //     const target = evt.target;

  //     if (itemStatusDropdownRef.current.contains(target as Node) === false) {
  //       setOpenMore(false);
  //     }
  //   };

  //   window.addEventListener('mousedown', outsideClickHandler);

  //   return () => window.removeEventListener('mousedown', outsideClickHandler);
  // }, []);

  // useEffect(() => {
  //   const outsideClickHandler = (evt: MouseEvent) => {
  //     const target = evt.target;

  //     if (
  //       itemStatusRef.current !== target &&
  //       itemStatusDropdownRef.current.contains(target as Node) === false
  //     ) {
  //       setOpenStatus(false);
  //     }
  //   };

  //   window.addEventListener('mousedown', outsideClickHandler);

  //   return () => window.removeEventListener('mousedown', outsideClickHandler);
  // }, []);

  const onDropDownMenuClick = (num: number) => {
    switch (num) {
      // 수정하기
      case 1:
        navigate(`/item/edit/${id}`);
        break;

      // 삭제하기
      case 99999:
        deleteItem(id);
        break;
    }
  };

  const deleteItem = async (itemId: string | undefined) => {
    try {
      if (
        !window.confirm(
          '아이템을 삭제하시겠습니까?\n아이템과 관련된 채팅 내용이 모두 사라집니다.',
        )
      ) {
        return;
      }

      await axios.delete(`/api/item/${itemId}`);
      alert('아이템을 삭제했습니다.');
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        alert(err.response?.data.message);
      }
    }
  };

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
    if (!isLoggedIn) {
      if (window.confirm('로그인 이후에 가능합니다.\n로그인 하시겠습니까?')) {
        navigate('/login');
      }
      return;
    }

    if (item.isLike) {
      axios.patch(`/api/item/unlike/${id}`);
    } else {
      axios.patch(`/api/item/like/${id}`);
    }

    setLike((prevLike: any) => !prevLike);
  };

  const handleClickChat = (owner: boolean, id: string) => {
    if (!isLoggedIn) {
      if (window.confirm('로그인 이후에 가능합니다.\n로그인 하시겠습니까?')) {
        navigate('/login');
      }
      return;
    }

    if (owner) {
      navigate('/chat');
    } else {
      navigate(`/chat/${id}`);
    }
  };

  if (!id) {
    return null;
  }

  const owner = user?.idx === item.seller;
  return (
    <DetailWrapper>
      <HeaderWrapper>
        <InvisibleHeader
          onClickBack={() => navigate('/home')}
          onClickMore={() => {
            setOpenMore((prevOpenMore) => !prevOpenMore);
          }}
          visibleMore={owner}
        />
        {openMore && (
          <Dropdown
            ref={itemMoreRef}
            width="100"
            top="20"
            right="20"
            items={dropdownItems}
            select={0}
            handleChange={onDropDownMenuClick}
          ></Dropdown>
        )}
      </HeaderWrapper>

      <BodyWrapper>
        {/* <ImgBox.Gradient height={320} src={item.images}></ImgBox.Gradient> */}
        <ImageSlide images={item.images}></ImageSlide>
        <ContentWrapper>
          {owner && (
            <StatusButton
              ref={itemStatusRef}
              dropdownRef={itemStatusDropdownRef}
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
          price={item.price ? Number(item.price).toLocaleString() : ''}
          Button={
            <Button size="md" onClick={() => handleClickChat(owner, id)}>
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
