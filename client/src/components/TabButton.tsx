import React from 'react';
import styled from 'styled-components';
import { colors } from './Color';

interface Props {
  active: boolean;
  value: number;
  children?: React.ReactNode;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const TabButtonStyle = styled.button<{
  active: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 34px;
  padding: 0px 0px 18px;

  cursor: pointer;

  ${({ active }) =>
    active ? `border-bottom: 2px solid ${colors.primary};` : ''}

  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  color: ${({ active }) => (active ? colors.primary : colors.gray1)};
`;

export const TabButton = ({ active, value, children, onClick }: Props) => {
  return (
    <TabButtonStyle active={active} onClick={onClick} value={value}>
      {children}
    </TabButtonStyle>
  );
};
