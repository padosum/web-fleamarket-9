import React, { forwardRef } from 'react';
import styled from 'styled-components';
import { useAuthContext } from '../../hooks/useAuthContext';
import { colors } from '../Color';
import { Icon } from '../Icon';
import { HeaderWrapper } from './HeaderWrapper';

interface Props {
  title: string;
  color: keyof typeof colors;
  onClickCategory: React.MouseEventHandler<HTMLDivElement>;
  onClickMap: React.MouseEventHandler<HTMLDivElement>;
  onClickUser: React.MouseEventHandler<HTMLDivElement>;
  onClickMenu: React.MouseEventHandler<HTMLDivElement>;
  ref?: React.MutableRefObject<HTMLDivElement>;
}

const LeftWrapper = styled.div<{
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}>`
  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;
  user-select: none;
`;

const CenterWrapper = styled.div<{ ref: any }>`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${colors.white};
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;

  cursor: pointer;
  user-select: none;
`;

const RightWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;
  user-select: none;

  div + div {
    margin-left: 10px;
  }
`;

export const MainHeader = forwardRef(
  (
    {
      title,
      color,
      onClickCategory,
      onClickMap,
      onClickUser,
      onClickMenu,
    }: Props,
    ref,
  ) => {
    const { isLoggedIn } = useAuthContext();

    return (
      <HeaderWrapper color={color} rad={true}>
        <LeftWrapper onClick={onClickCategory}>
          <Icon name="iconCategory" width={24} height={24} color="white"></Icon>
        </LeftWrapper>
        <CenterWrapper onClick={onClickMap} ref={ref}>
          <Icon name="iconMap" width={24} height={24} color="white"></Icon>
          {title}
        </CenterWrapper>
        <RightWrapper>
          <div onClick={onClickUser}>
            <Icon name="iconUser" width={24} height={24} color="white"></Icon>
          </div>
          {isLoggedIn && (
            <div onClick={onClickMenu}>
              <Icon name="iconMenu" width={24} height={24} color="white"></Icon>
            </div>
          )}
        </RightWrapper>
      </HeaderWrapper>
    );
  },
);
