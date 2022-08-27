import styled from 'styled-components';
import { ChatBar } from '../components/ChatBar';
import { ChatBubble } from '../components/ChatBubble';
import { colors } from '../components/Color';
import { ExitHeader } from '../components/Header/ExitHeader';
import { InfoProduct } from '../components/InfoProduct';
import { Spacing } from '../components/Spacing';

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
  return (
    <ChatDetailWrapper>
      <ExitHeader
        title={'UserE'}
        color={'white'}
        onClickBack={() => console.log('clickBack')}
        onClickExit={() => console.log('clickExit')}
      ></ExitHeader>
      <HorizontalBar />
      <InfoProduct
        src="https://i.picsum.photos/id/126/250/250.jpg?hmac=LREWNomCU5zCq58oNDwGUv6yUoPd9vOpAEJQUQiDWVM"
        title="title"
        price="1,000원"
        buttonText="예약"
        onButtonClick={() => {}}
      />
      <HorizontalBar />
      <ChatWrapper>
        <Spacing height={16} />
        <ChatBubble.TypeB text="dsabdfb" />
        <Spacing height={16} />
        <ChatBubble.TypeA text="dasd" />
        <Spacing height={16} />
        <ChatBubble.TypeB text="dsabdfb" />
        <Spacing height={16} />
        <ChatBubble.TypeA text="dasd" />
        <Spacing height={16} />
        <ChatBubble.TypeB text="dsabdfb" />
        <Spacing height={16} />
        <ChatBubble.TypeA text="dasd" />
        <Spacing height={16} />
        <ChatBubble.TypeB text="dsabdfb" />
        <Spacing height={16} />
        <ChatBubble.TypeA text="dasd" />
        <Spacing height={16} />
        <ChatBubble.TypeB text="dsabdfb" />
        <Spacing height={16} />
        <ChatBubble.TypeB text="dsabdfb" />
        <Spacing height={16} />
        <ChatBubble.TypeB text="dsabdfb" />
        <Spacing height={16} />
        <ChatBubble.TypeA text="dasd" />
        <Spacing height={16} />
        <ChatBubble.TypeB text="dsabdfb" />
        <Spacing height={16} />
        <ChatBubble.TypeB text="dsabdfb" />
        <Spacing height={16} />
        <ChatBubble.TypeA text="dasd" />
        <Spacing height={16} />
        <ChatBubble.TypeB text="dsabdfb" />
        <Spacing height={16} />
        <ChatBubble.TypeB text="dsabdfb" />
        <Spacing height={16} />
        <ChatBubble.TypeA text="dasd" />
        <Spacing height={16} />
        <ChatBubble.TypeB text="dsabdfb" />
        <Spacing height={16} />
        <ChatBubble.TypeB text="dsabdfb" />
        <Spacing height={16} />
        <ChatBubble.TypeA text="dasd" />
        <Spacing height={16} />
        <ChatBubble.TypeB text="dsabdfb" />
        <Spacing height={16} />
      </ChatWrapper>
      <ChatBarWrapper>
        <ChatBar />
      </ChatBarWrapper>
    </ChatDetailWrapper>
  );
};
