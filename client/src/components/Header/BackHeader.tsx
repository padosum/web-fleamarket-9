import styled from 'styled-components';
import { colors } from '../Color';
import { Icon } from '../Base';
import { HeaderWrapper } from './HeaderWrapper';

interface Props {
  title?: string;
  color: keyof typeof colors;
  onClickBack: React.MouseEventHandler<HTMLDivElement>;
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
  width: 24px;
`;

export const BackHeader = ({ title, color, onClickBack }: Props) => {
  return (
    <HeaderWrapper color={color}>
      <LeftWrapper onClick={onClickBack}>
        <Icon name="iconLeft" width={24} height={24} color="titleActive"></Icon>
      </LeftWrapper>
      <CenterWrapper>{title}</CenterWrapper>
      <RightWrapper></RightWrapper>
    </HeaderWrapper>
  );
};
