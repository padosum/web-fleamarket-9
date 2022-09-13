import styled from 'styled-components';
import * as icons from '../iconPath';
import { colors } from '../Color';

export interface IconProps {
  name: keyof typeof icons;
  width?: number;
  height?: number;
  color?: keyof typeof colors;
  strokeWidth?: number;
  fill?: keyof typeof colors;
  clickable?: boolean;
}

const IconWrapper = styled.div<IconProps>`
  width: ${({ width }) => (width ? `${width}px` : '16px')};
  height: ${({ height }) => (height ? `${height}px` : '16px')};

  ${({ clickable }) => clickable && `cursor: pointer;}`}
  ${({ clickable }) => clickable && `user-select: none;}`}
  
  & svg {
    width: auto;
    height: 100%;
    display: block;
  }
  & path,
  & circle,
  & g {
    stroke: ${({ color }) => (color ? colors[color] : colors.titleActive)};
    ${({ strokeWidth }) => (strokeWidth ? `stroke-width: ${strokeWidth};` : '')}
    ${({ fill }) => (fill ? `fill: ${colors[fill]};` : '')}
  }
`;

export const Icon = ({
  name,
  width,
  height,
  color,
  strokeWidth,
  fill,
  clickable,
}: IconProps) => {
  const SVGIcon = icons[name];

  return (
    <IconWrapper
      name={name}
      width={width}
      height={height}
      color={color}
      strokeWidth={strokeWidth}
      fill={fill}
      clickable={clickable}
    >
      <SVGIcon width={width} height={height} />
    </IconWrapper>
  );
};
