import styled from 'styled-components';
import { colors } from './Color';

const ChatBadgeWrapper = styled.div<{ left?: number; top?: number }>`
  padding: 4px;
  font-weight: 400;
  font-size: 12px;
  line-height: 12px;

  display: flex;
  align-items: center;
  text-align: center;
  color: ${colors.white};
  position: absolute;
  ${({ left }) => (left ? `left: ${left}px;` : 'left: -5px;')}
  ${({ top }) => (top ? `top: ${top}px;` : 'top: -5px;')}
  background-color: ${colors.primary3};
  border-radius: 50%;
`;

export const ChatBadge = ({
  count,
  left,
  top,
}: {
  count: number;
  left?: number;
  top?: number;
}) => {
  return (
    <ChatBadgeWrapper left={left} top={top}>
      {count}
    </ChatBadgeWrapper>
  );
};
