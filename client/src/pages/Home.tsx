import styled from 'styled-components';
import { TypoGraphy } from '../components/TypoGraphy';

const red = '#f00';

const Wrapper = styled.div`
  width: 100%;
  background-color: ${red};
`;

export const Home = () => {
  console.log('home');
  return (
    <Wrapper>
      <TypoGraphy.Large>Typo Large</TypoGraphy.Large>
      <TypoGraphy.Medium>Typo Medium</TypoGraphy.Medium>
      <TypoGraphy.Small>Typo Small</TypoGraphy.Small>
      <TypoGraphy.XSmall>Typo XSmall</TypoGraphy.XSmall>
      <TypoGraphy.MediumLink to="/n">Typo Link Medium</TypoGraphy.MediumLink>
      <TypoGraphy.SmallLink to="/b">Typo Link Small</TypoGraphy.SmallLink>
      <TypoGraphy.XSmallLink to="/s">Typo Link XSmall</TypoGraphy.XSmallLink>
    </Wrapper>
  );
};
