import styled from 'styled-components';
import { colors } from '../Color';

const isIos = (contents: string) => {
  return `
      @supports (-webkit-touch-callout: none) {
        ${contents}
      }
    `;
};

export const MainWrapper = styled.div`
  width: 100%;
  max-width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  ${isIos('height: -webkit-fill-available;')}

  background-color: ${colors.offWhite};
`;

export const LogoImg = styled.img`
  width: 300px;
  height: 300px;
  margin-bottom: 30px;
`;

export const LogoText = styled.span`
  font-size: 36px;
  font-weight: 700;
  font-family: 'UhBeeHam', sans-serif;
`;
