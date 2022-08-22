import styled from 'styled-components';
import { TypoGraphy } from '../components/TypoGraphy';

const red = '#f00';

const Wrapper = styled.div`
  width: 100%;
  background-color: ${red};
`;

export const Home = () => {
  return (
    <Wrapper>
      <TypoGraphy.Large>안녕하세요</TypoGraphy.Large>
      <TypoGraphy.Medium>안녕하세요</TypoGraphy.Medium>
    </Wrapper>
  );
};
