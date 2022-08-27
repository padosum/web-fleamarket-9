import axios from 'axios';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import { BackHeader } from '../components/Header/BackHeader';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { ChatListItem } from '../components/ChatListItem';

interface ChatRoom {
  idx: number;
  userName: string;
  message: string;
  updatedAt: string;
  images: string;
  unReadCount: number;
}
export const ChatList = () => {
  const navigate = useNavigate();

  const { isLoggedIn } = useAuthContext('ChatList');
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);

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
        {chatRooms.map((item) => (
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
