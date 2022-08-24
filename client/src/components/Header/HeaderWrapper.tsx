import styled from 'styled-components';
import { colors } from '../Color';

interface Props {
  children: React.ReactNode;
  color?: keyof typeof colors;
  rad?: boolean;
}

const HeaderWrapperStyle = styled.div<Props>`
  display: flex;
  justify-content: space-between;
  width: 100%;
  min-height: 56px;

  position: sticky;
  top: 0;
  left: 0;
  right: 0;

  ${({ color }) => (color ? `background-color: ${colors[color]};` : '')}
  padding: 0 16px;

  ${({ rad }) => (rad ? `border-radius: 0px 0px 16px 16px;` : '')}
  box-sizing: border-box;
`;

export const HeaderWrapper = ({ color, rad, children }: Props) => {
  return (
    <HeaderWrapperStyle color={color} rad={rad}>
      {children}
    </HeaderWrapperStyle>
  );
};
