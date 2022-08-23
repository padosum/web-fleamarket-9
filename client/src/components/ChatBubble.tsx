import styled from 'styled-components';
import { colors } from './Color';

const ChatBubbleContainerCommon = styled.div`
  width: max-content;
  padding: 8px;
  box-sizing: border-box;
  border: 1px solid ${colors.primary};
  max-width: 100%;
`;

const TypeAChatBubbleContainer = styled(ChatBubbleContainerCommon)`
  background-color: ${colors.white};
  border-radius: 0 8px 8px 8px;
`;

const TypeBChatBubbleContainer = styled(ChatBubbleContainerCommon)`
  background-color: ${colors.primary};
  border-radius: 8px 0 8px 8px;
`;

const ChatBubbleTextCommon = styled.span`
  font-size: 14px;
  font-weight: 500;
  display: inline-block;
  max-width: 100%;
`;

const TypeAChatBubbleText = styled(ChatBubbleTextCommon)`
  color: ${colors.titleActive};
`;

const TypeBChatBubbleText = styled(ChatBubbleTextCommon)`
  color: ${colors.white};
`;

export const ChatBubble = ({ text }: { text: string }) => {
  return (
    <TypeAChatBubbleContainer>
      <TypeAChatBubbleText>{text}</TypeAChatBubbleText>
    </TypeAChatBubbleContainer>
  );
};

ChatBubble.TypeA = ChatBubble;

ChatBubble.TypeB = ({ text }: { text: string }) => {
  return (
    <TypeBChatBubbleContainer>
      <TypeBChatBubbleText>{text}</TypeBChatBubbleText>
    </TypeBChatBubbleContainer>
  );
};
