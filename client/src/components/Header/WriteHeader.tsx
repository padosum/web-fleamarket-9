import styled from 'styled-components';
import { colors } from '../Color';
import { Icon } from '../Base';
import { HeaderWrapper } from './HeaderWrapper';

interface Props {
  title?: string;
  color: keyof typeof colors;
  active?: boolean;
  onClickBack: React.MouseEventHandler<HTMLDivElement>;
  onClickCheck: React.MouseEventHandler<HTMLDivElement>;
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

export const WriteHeader = ({
  title,
  color,
  active,
  onClickBack,
  onClickCheck,
}: Props) => {
  return (
    <HeaderWrapper color={color}>
      <LeftWrapper onClick={onClickBack}>
        <Icon name="iconLeft" width={24} height={24} color="titleActive"></Icon>
      </LeftWrapper>
      <CenterWrapper>{title}</CenterWrapper>
      <RightWrapper onClick={onClickCheck}>
        <Icon
          name="iconCheck"
          width={24}
          height={24}
          color={active ? 'primary' : 'gray1'}
        ></Icon>
      </RightWrapper>
    </HeaderWrapper>
  );
};
