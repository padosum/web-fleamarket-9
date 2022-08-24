import styled from 'styled-components';
import { colors } from './Color';

interface Props {
  size?: 'md' | 'lg';
  bgColor?: keyof typeof colors;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const WIDTH = {
  md: '136px',
  lg: '290px',
};

const HEIGHT = {
  md: '36px',
  lg: '42px',
};

const FONT_SIZE = {
  md: '14px',
  lg: '16px',
};

const PADDING = {
  md: '8px 16px',
  lg: '10px 16px',
};

const ButtonCommon = styled.button<Props>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  width: ${({ size }) => (size ? WIDTH[size] : '100%')};
  height: ${({ size }) => (size ? HEIGHT[size] : HEIGHT.md)};
  padding: ${({ size }) => (size ? PADDING[size] : PADDING.md)};
  color: ${colors.white};
  background-color: ${({ bgColor }) =>
    bgColor ? colors[bgColor] : colors.primary};
  font-size: ${({ size }) => (size ? FONT_SIZE[size] : '16px')};
  font-weight: 500;
  border-radius: 8px;

  &:hover {
    background-color: ${({ bgColor }) =>
      bgColor ? colors[bgColor] : colors.primary3};
  }
  &:focus {
    background-color: ${({ bgColor }) =>
      bgColor ? colors[bgColor] : colors.primary};
    border: 2px solid
      ${({ bgColor }) => (bgColor ? colors[bgColor] : colors.primary2)};
  }
  &:disabled {
    cursor: not-allowed;
    background-color: ${({ bgColor }) =>
      bgColor ? colors[bgColor] : colors.primary2};
  }
`;

export const Button = ({
  size,
  bgColor,
  disabled,
  className,
  children,
  onClick,
}: Props) => {
  return (
    <ButtonCommon
      size={size}
      bgColor={bgColor}
      disabled={disabled}
      className={className}
      onClick={onClick}
    >
      {children}
    </ButtonCommon>
  );
};
