import React from 'react';
import styled from 'styled-components';
import * as icons from './iconPath';
import { colors } from './Color';

export interface Props {
  name: keyof typeof icons;
  width?: number;
  height?: number;
  color?: keyof typeof colors;
}

const IconWrapper = styled.div<Props>`
  width: ${({ width }) => (width ? `${width}px` : '16px')};
  height: ${({ height }) => (height ? `${height}px` : '16px')};

  & svg {
    width: auto;
    height: 100%;
    display: block;
  }
  & path,
  & circle,
  & g {
    stroke: ${({ color }) => (color ? colors[color] : colors.titleActive)};
  }
`;

export const Icon = ({ name, width, height, color }: Props) => {
  const SVGIcon = icons[name];

  return (
    <IconWrapper name={name} width={width} height={height} color={color}>
      <SVGIcon />
    </IconWrapper>
  );
};
