import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ChatListItem, ChatListItemSkeleton } from '../Base';
import { colors } from '../Color';
import { EmptyText } from './Common';

interface ChatRoom {
  idx: number;
  userName: string;
  message: string;
  updatedAt: string;
  images: string;
  unReadCount: number;
}

export const ChattingList = () => {
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const getChatRooms = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get('/api/chat');
        setChatRooms(data);
        setLoading(false);
      } catch (err) {}
    };

    getChatRooms();
  }, []);

  const handleEnterChatRoom = (idx: number) => {
    navigate(`/chat/${idx}`);
  };

  return (
    <ChattingListWrapper>
      {chatRooms.map((item) => (
        <ChatListItem
          key={item.idx}
          onClick={handleEnterChatRoom.bind(null, item.idx)}
          {...item}
        />
      ))}
      {loading && chatRooms.length === 0 && (
        <>
          <ChatListItemSkeleton></ChatListItemSkeleton>
          <ChatListItemSkeleton></ChatListItemSkeleton>
          <ChatListItemSkeleton></ChatListItemSkeleton>
        </>
      )}
      {!loading && chatRooms.length === 0 && (
        <EmptyText>채팅 기록이 없습니다.</EmptyText>
      )}
    </ChattingListWrapper>
  );
};

const ChattingListWrapper = styled.div`
  width: 100%;
  flex-grow: 1;
  max-height: calc(100vh - 107px);
  background-color: ${colors.white};
`;
