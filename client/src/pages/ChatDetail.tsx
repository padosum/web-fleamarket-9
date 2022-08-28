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
import useIntersectionObserver from '../hooks/useIntersectionObserver';

import axios from 'axios';

export const ChatDetail = () => {
  const worker = useWorker();
  const navigate = useNavigate();
  const { id } = useParams();
  const { user, isLoggedIn } = useAuthContext('chat-detail');

  const [chatRoom, setChatRoom] = useState<{
    idx: number;
    title: string;
    price: number;
    name: string;
    images: string;
    itemStatus: string;
    recieverId: number;
    unReadCount: number;
  }>(null!);

  const [messages, setMessages] = useState<
    { idx: number; message: string; sender: number; isNew?: boolean }[]
  >([]);
  const [lastMessageId, setLastMessageId] = useState(0);

  const [scrolltoBottom, setScrollToBottom] = useState(true);

  const [chatInput, setChatInput] = useState('');
  const chatWrapperRef = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    const getMessages = async (lastMessageId?: number) => {
      try {
        const { data } = await axios.get('/api/chat/message', {
          params: { chatId: id, lastMessageId },
        });
        setMessages(data);
      } catch (err) {
        navigate(-1);
      }
    };

    const getChatRoom = async () => {
      try {
        const { data } = await axios.get(`/api/chat/room`, {
          params: { chatId: id },
        });
        setChatRoom(data);

        // 메시지 읽음 처리
        if (data.unReadCount > 0) {
          await axios.patch(`/api/chat/${id}`);
        }
      } catch (err) {
        alert(err);
      }
    };

    getChatRoom();
    getMessages();
  }, []);

  const onSendButtonClick = async () => {
    if (chatInput === '') {
      return;
    }

    const { data } = await axios.post(`/api/chat/${id}`, {
      message: chatInput,
    });

    worker.port.postMessage(
      JSON.stringify({
        event: SEND_CHAT,
        data: {
          chatId: id,
          idx: data.idx,
          sender: user?.idx,
          reciever: chatRoom.recieverId,
          message: chatInput,
        },
      }),
    );

    setScrollToBottom(true);
    setMessages((messages) => [
      ...messages,
      { idx: data.idx, sender: user?.idx!, message: chatInput, isNew: true },
    ]);

    setChatInput('');
  };

  const handleRecieveMessage = async (data: {
    chatId: number;
    idx: number;
    sender: number;
    message: string;
    isNew?: boolean;
  }) => {
    if (!id) {
      return;
    }
    if (+data.chatId === +id) {
      // 읽음 처리
      await axios.patch(`/api/chat/${data.chatId}`);

      setScrollToBottom(true);
      setMessages((messages) => [...messages, { ...data, isNew: true }]);
    }
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
    const handleWebSocketData = (e: any) => handleRecieveMessage(e.data);
    worker.port.addEventListener('message', handleWebSocketData);

    worker.port.start();
    return () =>
      worker.port.removeEventListener('message', handleWebSocketData);
  }, []);

  useEffect(() => {
    if (scrolltoBottom) {
      chatWrapperRef.current.scrollTo({
        top: chatWrapperRef.current.scrollHeight,
      });
    } else {
      const { scrollHeight } = chatWrapperRef.current!;
      const newScrollTop = scrollHeight - prevScrollBottomRef.current;
      chatWrapperRef.current.scrollTo({ top: newScrollTop });
    }
  }, [messages]);

  const prevScrollBottomRef = useRef(0);

  const onIntersect: IntersectionObserverCallback = async ([
    { isIntersecting },
  ]) => {
    if (isIntersecting) {
      if (messages[0]) {
        if (messages[0].idx !== lastMessageId) {
          const { scrollHeight, scrollTop } = chatWrapperRef.current!;
          prevScrollBottomRef.current = scrollHeight - scrollTop;

          const getMessages = async (lastMessageId?: number) => {
            try {
              const { data } = await axios.get('/api/chat/message', {
                params: { chatId: id, lastMessageId },
              });

              setMessages((prevMessages) => [...data, ...prevMessages]);
              setLastMessageId(messages[0].idx);
            } catch (err) {
              navigate(-1);
            }
          };
          setScrollToBottom(false);
          getMessages(messages[0].idx);
        }
      }
    }
  };

  const { setTarget } = useIntersectionObserver({ onIntersect });

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
        src={
          chatRoom
            ? chatRoom?.images.split(',')[0]
            : 'https://i.picsum.photos/id/126/250/250.jpg?hmac=LREWNomCU5zCq58oNDwGUv6yUoPd9vOpAEJQUQiDWVM'
        }
        title={chatRoom?.title}
        price={chatRoom ? Number(chatRoom?.price).toLocaleString() + '원' : ''}
        buttonText={chatRoom?.itemStatus}
        onButtonClick={() => {}}
      />
      <HorizontalBar />
      <ChatWrapper ref={chatWrapperRef}>
        <div ref={setTarget}></div>
        {messages.map(({ idx, sender, message, isNew }, index) => {
          return (
            <div key={`${idx}-${index}`}>
              <Spacing height={16} />
              {sender === user?.idx ? (
                <ChatBubble.TypeB
                  className={isNew ? 'new' : ''}
                  text={message}
                />
              ) : (
                <ChatBubble.TypeA
                  className={isNew ? 'new' : ''}
                  text={message}
                />
              )}
              <Spacing height={16} />
            </div>
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
