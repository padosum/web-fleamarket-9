import styled from 'styled-components';
import { colors } from '../Color';
import { Icon } from '../Icon';
import { HeaderWrapper } from './HeaderWrapper';

interface Props {
  onClickBack: React.MouseEventHandler<HTMLDivElement>;
  onClickMore: React.MouseEventHandler<HTMLDivElement>;
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

export const InvisibleHeader = ({ onClickBack, onClickMore }: Props) => {
  return (
    <HeaderWrapper>
      <LeftWrapper onClick={onClickBack}>
        <Icon name="iconLeft" width={24} height={24} color="white"></Icon>
      </LeftWrapper>
      <CenterWrapper></CenterWrapper>
      <RightWrapper onClick={onClickMore}>
        <Icon name="iconMore" width={24} height={24} color="white"></Icon>
      </RightWrapper>
    </HeaderWrapper>
  );
};