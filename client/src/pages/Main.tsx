import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Spacing } from '../components/Base';
import { Styled } from '../components/Main';
import { useHomeItemFetch } from '../hooks';

export const Main = () => {
  const { resetCategoryLocationId } = useHomeItemFetch();

  useEffect(() => {
    resetCategoryLocationId();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Styled.MainWrapper>
      <Styled.LogoImg src="https://user-images.githubusercontent.com/49009864/186298954-7b250a2b-f056-43e8-87bd-1b18635601ac.png" />
      <Styled.LogoText>우아 마켙</Styled.LogoText>
      <Spacing height={24} />
      <div>
        <Link to="home">
          <Button size="lg">구경하러 가기</Button>
        </Link>
      </div>
    </Styled.MainWrapper>
  );
};
