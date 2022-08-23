import styled from 'styled-components';
import { colors } from '../Color';
import { Icon } from '../Icon';
import { HeaderWrapper } from './HeaderWrapper';

interface Props {
  title?: string;
  color: keyof typeof colors;
  onClickBack: React.MouseEventHandler<HTMLDivElement>;
  onClickExit: React.MouseEventHandler<HTMLDivElement>;
}

const LeftWrapper = styled.div`
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
  color: ${colors.titleActive};
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
`;

const RightWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;
  user-select: none;
`;

export const ExitHeader = ({
  title,
  color,
  onClickBack,
  onClickExit,
}: Props) => {
  return (
    <HeaderWrapper color={color}>
      <LeftWrapper onClick={onClickBack}>
        <Icon name="iconLeft" width={24} height={24} color="titleActive"></Icon>
      </LeftWrapper>
      <CenterWrapper>{title}</CenterWrapper>
      <RightWrapper onClick={onClickExit}>
        <Icon name="iconLogout" width={24} height={24} color="red"></Icon>
      </RightWrapper>
    </HeaderWrapper>
  );
};
