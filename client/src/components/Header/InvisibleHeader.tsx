import { forwardRef } from 'react';
import styled from 'styled-components';
import { colors } from '../Color';
import { Icon } from '../Base';
import { HeaderWrapper } from './HeaderWrapper';

interface Props {
  color?: keyof typeof colors | '';
  onClickBack: React.MouseEventHandler<HTMLDivElement>;
  onClickMore?: React.MouseEventHandler<HTMLDivElement>;
  visibleMore?: boolean;
  ref?: React.MutableRefObject<HTMLDivElement>;
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

const RightWrapper = styled.div<{
  ref: any;
}>`
  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;
  user-select: none;
`;

export const InvisibleHeader = forwardRef(
  ({ color, onClickBack, onClickMore, visibleMore }: Props, ref) => {
    return (
      <HeaderWrapper color={color}>
        <LeftWrapper onClick={onClickBack}>
          <Icon name="iconLeft" width={24} height={24} color="white"></Icon>
        </LeftWrapper>
        <CenterWrapper></CenterWrapper>
        <RightWrapper onClick={onClickMore} ref={ref}>
          {visibleMore && (
            <Icon name="iconMore" width={24} height={24} color="white"></Icon>
          )}
        </RightWrapper>
      </HeaderWrapper>
    );
  },
);
