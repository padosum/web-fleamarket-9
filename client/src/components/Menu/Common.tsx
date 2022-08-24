import styled from 'styled-components';
import { colors } from '../Color';

const GrayText = styled.span`
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  color: ${colors.gray4};
`;

const EmptyTextWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const EmptyText = ({ children }: { children: string }) => {
  return (
    <EmptyTextWrapper>
      <GrayText>{children}</GrayText>
    </EmptyTextWrapper>
  );
};
