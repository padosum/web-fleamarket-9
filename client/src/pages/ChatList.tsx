import axios from 'axios';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import { BackHeader } from '../components/Header/BackHeader';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { ChatListItem } from '../components/ChatListItem';

const chatRoomsMock = [
  {
    idx: 1,
    userName: 'UserE',
    message: '실제로 신어볼 수 있는건가요???sdfsfssssssfsdf',
    updatedAt: '1분 전',
    image:
      'https://i.picsum.photos/id/126/250/250.jpg?hmac=LREWNomCU5zCq58oNDwGUv6yUoPd9vOpAEJQUQiDWVM',
    unReadCount: 200,
  },
  {
    idx: 2,
    userName: 'UserD',
    message: '감사합니다! :)',
    updatedAt: '1시간 전',
    image:
      'https://i.picsum.photos/id/126/250/250.jpg?hmac=LREWNomCU5zCq58oNDwGUv6yUoPd9vOpAEJQUQiDWVM',
    unReadCount: 2,
  },
  {
    idx: 3,
    userName: 'UserD',
    message: '감사합니다! :)',
    updatedAt: '1시간 전',
    image:
      'https://i.picsum.photos/id/126/250/250.jpg?hmac=LREWNomCU5zCq58oNDwGUv6yUoPd9vOpAEJQUQiDWVM',
    unReadCount: 22,
  },
  {
    idx: 4,
    userName: 'UserD',
    message: '감사합니다! :)',
    updatedAt: '1시간 전',
    image:
      'https://i.picsum.photos/id/126/250/250.jpg?hmac=LREWNomCU5zCq58oNDwGUv6yUoPd9vOpAEJQUQiDWVM',
    unReadCount: 0,
  },
  {
    idx: 5,
    userName: 'UserD',
    message: '감사합니다! :)',
    updatedAt: '1시간 전',
    image:
      'https://i.picsum.photos/id/126/250/250.jpg?hmac=LREWNomCU5zCq58oNDwGUv6yUoPd9vOpAEJQUQiDWVM',
    unReadCount: 0,
  },
  {
    idx: 6,
    userName: 'UserD',
    message: '감사합니다! :)',
    updatedAt: '1시간 전',
    image:
      'https://i.picsum.photos/id/126/250/250.jpg?hmac=LREWNomCU5zCq58oNDwGUv6yUoPd9vOpAEJQUQiDWVM',
    unReadCount: 0,
  },
  {
    idx: 7,
    userName: 'UserD',
    message: '감사합니다! :)',
    updatedAt: '1시간 전',
    image:
      'https://i.picsum.photos/id/126/250/250.jpg?hmac=LREWNomCU5zCq58oNDwGUv6yUoPd9vOpAEJQUQiDWVM',
    unReadCount: 0,
  },
  {
    idx: 8,
    userName: 'UserD',
    message: '감사합니다! :)',
    updatedAt: '1시간 전',
    image:
      'https://i.picsum.photos/id/126/250/250.jpg?hmac=LREWNomCU5zCq58oNDwGUv6yUoPd9vOpAEJQUQiDWVM',
    unReadCount: 0,
  },
  {
    idx: 9,
    userName: 'UserD',
    message: '감사합니다! :)',
    updatedAt: '1시간 전',
    image:
      'https://i.picsum.photos/id/126/250/250.jpg?hmac=LREWNomCU5zCq58oNDwGUv6yUoPd9vOpAEJQUQiDWVM',
    unReadCount: 0,
  },
  {
    idx: 10,
    userName: 'UserD',
    message: '감사합니다! :)',
    updatedAt: '1시간 전',
    image:
      'https://i.picsum.photos/id/126/250/250.jpg?hmac=LREWNomCU5zCq58oNDwGUv6yUoPd9vOpAEJQUQiDWVM',
    unReadCount: 0,
  },
  {
    idx: 11,
    userName: 'UserD',
    message: '감사합니다! :)',
    updatedAt: '1시간 전',
    image:
      'https://i.picsum.photos/id/126/250/250.jpg?hmac=LREWNomCU5zCq58oNDwGUv6yUoPd9vOpAEJQUQiDWVM',
    unReadCount: 0,
  },
  {
    idx: 12,
    userName: 'UserD',
    message: '감사합니다! :)',
    updatedAt: '1시간 전',
    image:
      'https://i.picsum.photos/id/126/250/250.jpg?hmac=LREWNomCU5zCq58oNDwGUv6yUoPd9vOpAEJQUQiDWVM',
    unReadCount: 0,
  },
  {
    idx: 13,
    userName: 'UserD',
    message: '감사합니다! :)',
    updatedAt: '1시간 전',
    image:
      'https://i.picsum.photos/id/126/250/250.jpg?hmac=LREWNomCU5zCq58oNDwGUv6yUoPd9vOpAEJQUQiDWVM',
    unReadCount: 0,
  },
  {
    idx: 14,
    userName: 'UserD',
    message: '감사합니다! :)',
    updatedAt: '1시간 전',
    image:
      'https://i.picsum.photos/id/126/250/250.jpg?hmac=LREWNomCU5zCq58oNDwGUv6yUoPd9vOpAEJQUQiDWVM',
    unReadCount: 0,
  },
  {
    idx: 15,
    userName: 'UserD',
    message: '감사합니다! :)',
    updatedAt: '1시간 전',
    image:
      'https://i.picsum.photos/id/126/250/250.jpg?hmac=LREWNomCU5zCq58oNDwGUv6yUoPd9vOpAEJQUQiDWVM',
    unReadCount: 0,
  },
];

export const ChatList = () => {
  const navigate = useNavigate();

  const { isLoggedIn } = useAuthContext('ChatList');
  const [chatRooms, setChatRooms] = useState([]);

  const [searchParams] = useSearchParams();
  const itemId = searchParams.get('itemId');

  useEffect(() => {
    const getChatRooms = async () => {
      try {
        const { data } = await axios.get('/api/chat', { params: { itemId } });
        setChatRooms(data);
      } catch (err) {}
    };

    getChatRooms();
  }, []);

  const handleEnterChatRoom = (idx: number) => {
    navigate(`/chat/${idx}`);
  };

  return (
    <ChatListWrapper>
      {!isLoggedIn && <Navigate to="/home" replace />}
      {!itemId && <Navigate to="/home" replace />}
      <HeaderWrapper>
        <BackHeader
          title="채팅하기"
          color="offWhite"
          onClickBack={() => navigate(-1)}
        ></BackHeader>
      </HeaderWrapper>
      <ContentWrapper>
        {chatRoomsMock.map((item) => (
          <ChatListItem
            key={item.idx}
            onClick={handleEnterChatRoom.bind(null, item.idx)}
            {...item}
          />
        ))}
      </ContentWrapper>
    </ChatListWrapper>
  );
};

const ChatListWrapper = styled.div`
  width: 100%;
  min-width: 100%;
  height: 100vh;
`;

const HeaderWrapper = styled.div`
  position: sticky;
  top: 0;
  z-index: 9;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  overflow-y: auto;
  width: 100%;
  height: 100vh;
`;
