import styled from 'styled-components';
import { colors } from '../Color';

export const WriteWrapper = styled.div`
  width: 100%;
  max-width: 100%;

  @supports (-webkit-touch-callout: none) {
    max-height: -webkit-fill-available;
  }

  box-sizing: border-box;
`;

export const HeaderWrapper = styled.div`
  position: sticky;
  width: 100%;
  z-index: 9;
  top: 0;
  border-bottom: 1px solid ${colors.gray3};
`;

export const BodyWrapper = styled.div`
  padding: 0 16px;
  box-sizing: border-box;
`;

export const ImgWrap = styled.div`
  display: flex;
  max-width: 100%;
  padding: 24px 0;
  width: 100%;
  box-sizing: border-box;
  overflow: auto;
`;

export const HorizontalBar = styled.div`
  height: 1px;
  width: 100%;
  background-color: ${colors.gray3};
`;

export const HorizontalSpacing = styled.div<{ width: number }>`
  width: ${({ width }) => `${width}px`};
  min-width: ${({ width }) => `${width}px`};
`;

export const LocationWrapper = styled.div`
  height: 36px;
  width: 100%;
  max-width: 100%;
  overflow: hidden;
`;

export const CategoryWrapper = styled.div`
  width: 100%;
  max-width: 100%;
  overflow: auto;
`;
