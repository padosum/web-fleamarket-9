import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Button, Spacing } from '../components/Base';
import { colors } from '../components/Color';
import { useHomeItemFetch } from '../hooks';

const isIos = (contents: string) => {
  return `
    @supports (-webkit-touch-callout: none) {
      ${contents}
    }
  `;
};

const MainWrapper = styled.div`
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

const LogoImg = styled.img`
  width: 300px;
  height: 300px;
  margin-bottom: 30px;
`;

const LogoText = styled.span`
  font-size: 36px;
  font-weight: 700;
  font-family: 'UhBeeHam', sans-serif;
`;

export const Main = () => {
  const { resetCategoryLocationId } = useHomeItemFetch();

  useEffect(() => {
    resetCategoryLocationId();
  }, []);

  return (
    <MainWrapper>
      <LogoImg src="https://user-images.githubusercontent.com/49009864/186298954-7b250a2b-f056-43e8-87bd-1b18635601ac.png" />
      <LogoText>우아 마켙</LogoText>
      <Spacing height={24} />
      <div>
        <Link to="home">
          <Button size="lg">구경하러 가기</Button>
        </Link>
      </div>
    </MainWrapper>
  );
};
