import styled from 'styled-components';
import { ChatBar } from '../components/ChatBar';
import { ChatBubble } from '../components/ChatBubble';
import { colors } from '../components/Color';
import { ExitHeader } from '../components/Header/ExitHeader';
import { InfoProduct } from '../components/InfoProduct';
import { Spacing } from '../components/Spacing';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useWorker } from '../context/WorkerContext';
import { SEND_CHAT } from '../utils/constant';
import { useAuthContext } from '../context/AuthContext';
import axios from 'axios';

const ChatDetailWrapper = styled.div`
  width: 100%;
  max-width: 100%;
`;

const HorizontalBar = styled.div`
  width: 100%;
  max-width: 100%;
  height: 1px;
  background-color: ${colors.gray3};
`;

const ChatWrapper = styled.div`
  width: 100%;
  max-width: 100%;
  padding: 0 16px;
  box-sizing: border-box;
  height: calc(100vh - 182px);
  max-height: calc(100vh - 182px);
  overflow-y: auto;
`;

const ChatBarWrapper = styled.div`
  width: 100%;
  max-width: 100%;
`;

export const ChatDetail = () => {
  const [chatRoom, setChatRoom] = useState<{
    title: string;
    price: number;
    name: string;
    itemStatus: string;
  }>(null!);

  const [messages, setMessages] = useState<
    { message: string; sender: number }[]
  >([]);

  const [chatInput, setChatInput] = useState('');
  const chatWrapperRef = useRef<HTMLDivElement>(null!);
  const navigate = useNavigate();
  const { id } = useParams();

  const worker = useWorker();
  const { user, isLoggedIn } = useAuthContext('chat-detail');

  // TODO 전달받은 id 값으로 메시지 조회

  const onSendButtonClick = () => {
    axios.post(`/api/chat/${id}`, {
      message: chatInput,
    });

    worker.port.postMessage(
      JSON.stringify({ event: SEND_CHAT, data: chatInput }),
    );

    setChatInput('');
  };

  const handleMessage = (data: { sender: number; message: string }) => {
    setMessages((messages) => [...messages, data]);
  };

  const handleExitChatRoom = async () => {
    if (
      !window.confirm(
        '채팅방을 삭제하시겠습니까?\n채팅 내용이 모두 사라집니다.',
      )
    ) {
      return;
    }

    const { data } = await axios.delete(`/api/chat/${id}`);
    alert(data.message);
    navigate(-1);
  };

  useEffect(() => {
    const handleWebSocketData = (e: any) => handleMessage(e.data);
    worker.port.addEventListener('message', handleWebSocketData);

    worker.port.start();
    return () =>
      worker.port.removeEventListener('message', handleWebSocketData);
  }, []);

  useEffect(() => {
    chatWrapperRef.current.scrollTo({ top: 10000000000000000 });
  }, [messages]);

  return (
    <ChatDetailWrapper>
      {!isLoggedIn && <Navigate to="/home" replace />}
      <ExitHeader
        title={chatRoom?.name}
        color={'white'}
        onClickBack={() => navigate(-1)}
        onClickExit={handleExitChatRoom}
      ></ExitHeader>
      <HorizontalBar />
      <InfoProduct
        src="https://i.picsum.photos/id/126/250/250.jpg?hmac=LREWNomCU5zCq58oNDwGUv6yUoPd9vOpAEJQUQiDWVM"
        title={chatRoom?.title}
        price={chatRoom ? Number(chatRoom?.price).toLocaleString() + '원' : ''}
        buttonText={chatRoom?.itemStatus}
        onButtonClick={() => {}}
      />
      <HorizontalBar />
      <ChatWrapper ref={chatWrapperRef}>
        <Spacing height={16} />
        {messages.map(({ sender, message }) => {
          return (
            <>
              {sender === user?.idx ? (
                <ChatBubble.TypeB text={message} />
              ) : (
                <ChatBubble.TypeA text={message} />
              )}
              <Spacing height={16} />
            </>
          );
        })}

        <Spacing height={16} />
      </ChatWrapper>
      <ChatBarWrapper>
        <ChatBar
          text={chatInput}
          onTextChange={(e) => setChatInput(e.target.value)}
          buttonActive={!!chatInput}
          onButtonClick={onSendButtonClick}
          onEnter={onSendButtonClick}
        />
      </ChatBarWrapper>
    </ChatDetailWrapper>
  );
};
