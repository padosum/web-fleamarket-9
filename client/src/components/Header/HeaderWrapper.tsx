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
  height: 56px;

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
