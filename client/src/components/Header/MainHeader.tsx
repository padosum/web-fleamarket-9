import React from 'react';
import styled from 'styled-components';
import { colors } from '../Color';
import { Icon } from '../Icon';
import { HeaderWrapper } from './HeaderWrapper';

interface Props {
  color: keyof typeof colors;
  onClickCategory: React.MouseEventHandler<HTMLDivElement>;
  onClickMap: React.MouseEventHandler<HTMLDivElement>;
  onClickUser: React.MouseEventHandler<HTMLDivElement>;
  onClickMenu: React.MouseEventHandler<HTMLDivElement>;
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

const CenterWrapper = styled.div`
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

export const MainHeader = ({
  color,
  onClickCategory,
  onClickMap,
  onClickUser,
  onClickMenu,
}: Props) => {
  return (
    <HeaderWrapper color={color} rad={true}>
      <LeftWrapper onClick={onClickCategory}>
        <Icon name="iconCategory" width={24} height={24} color="white"></Icon>
      </LeftWrapper>
      <CenterWrapper onClick={onClickMap}>
        <Icon name="iconMap" width={24} height={24} color="white"></Icon>장소
      </CenterWrapper>
      <RightWrapper>
        <div onClick={onClickUser}>
          <Icon name="iconUser" width={24} height={24} color="white"></Icon>
        </div>
        <div onClick={onClickMenu}>
          <Icon name="iconMenu" width={24} height={24} color="white"></Icon>
        </div>
      </RightWrapper>
    </HeaderWrapper>
  );
};
