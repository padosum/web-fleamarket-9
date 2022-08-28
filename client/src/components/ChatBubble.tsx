import styled, { css } from 'styled-components';
import { colors } from './Color';

const ChatBubbleContainerCommon = styled.div<{ className?: string }>`
  width: max-content;
  padding: 8px;
  box-sizing: border-box;
  border: 1px solid ${colors.primary};
  max-width: 100%;

  ${(props) =>
    props.className === 'new' &&
    css`
      transform: scale(0);
      transform-origin: 0 0;
      animation: bounce 500ms linear both;
    `}

  @keyframes bounce {
    0% {
      transform: matrix3d(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
    }
    4.7% {
      transform: matrix3d(0.45, 0, 0, 0, 0, 0.45, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
    }
    9.41% {
      transform: matrix3d(
        0.883,
        0,
        0,
        0,
        0,
        0.883,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        1
      );
    }
    14.11% {
      transform: matrix3d(
        1.141,
        0,
        0,
        0,
        0,
        1.141,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        1
      );
    }
    18.72% {
      transform: matrix3d(
        1.212,
        0,
        0,
        0,
        0,
        1.212,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        1
      );
    }
    24.32% {
      transform: matrix3d(
        1.151,
        0,
        0,
        0,
        0,
        1.151,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        1
      );
    }
    29.93% {
      transform: matrix3d(
        1.048,
        0,
        0,
        0,
        0,
        1.048,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        1
      );
    }
    35.54% {
      transform: matrix3d(
        0.979,
        0,
        0,
        0,
        0,
        0.979,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        1
      );
    }
    41.04% {
      transform: matrix3d(
        0.961,
        0,
        0,
        0,
        0,
        0.961,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        1
      );
    }
    52.15% {
      transform: matrix3d(
        0.991,
        0,
        0,
        0,
        0,
        0.991,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        1
      );
    }
    63.26% {
      transform: matrix3d(
        1.007,
        0,
        0,
        0,
        0,
        1.007,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        1
      );
    }
    85.49% {
      transform: matrix3d(
        0.999,
        0,
        0,
        0,
        0,
        0.999,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        1
      );
    }
    100% {
      transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
    }
  }
`;

const TypeAChatBubbleContainer = styled(ChatBubbleContainerCommon)<{
  className?: string;
}>`
  background-color: ${colors.white};
  border-radius: 0 8px 8px 8px;
`;

const TypeBChatBubbleContainer = styled(ChatBubbleContainerCommon)<{
  className?: string;
}>`
  background-color: ${colors.primary};
  border-radius: 8px 0 8px 8px;
  margin-left: auto;
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

export const ChatBubble = ({
  text,
  className,
}: {
  text: string;
  className?: string;
}) => {
  return (
    <TypeAChatBubbleContainer className={className}>
      <TypeAChatBubbleText>{text}</TypeAChatBubbleText>
    </TypeAChatBubbleContainer>
  );
};

ChatBubble.TypeA = ChatBubble;

ChatBubble.TypeB = ({
  text,
  className,
}: {
  text: string;
  className?: string;
}) => {
  return (
    <TypeBChatBubbleContainer className={className}>
      <TypeBChatBubbleText>{text}</TypeBChatBubbleText>
    </TypeBChatBubbleContainer>
  );
};
