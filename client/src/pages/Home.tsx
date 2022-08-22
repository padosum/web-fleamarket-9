import styled from 'styled-components';
import { Button } from '../components/Button';
import { Icon } from '../components/Icon';
import { TextInput } from '../components/TextInput';
import { TypoGraphy } from '../components/TypoGraphy';

const Wrapper = styled.div`
  width: 100%;
`;

const clickHandler = () => {
  console.log('click');
};

export const Home = () => {
  console.log('home');

  return (
    <Wrapper>
      <TypoGraphy.Large>안녕하세요</TypoGraphy.Large>
      <TypoGraphy.Medium>안녕하세요</TypoGraphy.Medium>
      <Icon name="iconCategory" color="offWhite"></Icon>
      <Icon name="iconMenu" width={100} height={100} color="primary"></Icon>
      <Icon name="iconUser" color="offWhite"></Icon>
      <Icon name="iconMap" color="white"></Icon>
      <Icon name="iconLeft" color="gray1"></Icon>
      <Icon name="iconDown" color="offWhite"></Icon>
      <Icon name="iconRight" color="offWhite"></Icon>
      <Icon name="iconClose" color="offWhite"></Icon>
      <Icon name="iconAdd" color="offWhite"></Icon>
      <Icon name="iconCheck" color="offWhite"></Icon>
      <Icon name="iconMore" color="offWhite"></Icon>
      <Icon name="iconLogout" color="offWhite"></Icon>
      <Icon name="iconImage" color="offWhite"></Icon>
      <Icon name="iconSend" color="offWhite"></Icon>
      <Icon name="iconMessage" color="offWhite"></Icon>
      <Icon name="iconHeart" color="offWhite"></Icon>

      <TypoGraphy.Large>Typo Large</TypoGraphy.Large>
      <TypoGraphy.Medium>Typo Medium</TypoGraphy.Medium>
      <TypoGraphy.Small>Typo Small</TypoGraphy.Small>
      <TypoGraphy.XSmall>Typo XSmall</TypoGraphy.XSmall>
      <TypoGraphy.MediumLink to="/n">Typo Link Medium</TypoGraphy.MediumLink>
      <TypoGraphy.SmallLink to="/b">Typo Link Small</TypoGraphy.SmallLink>
      <TypoGraphy.XSmallLink to="/s">Typo Link XSmall</TypoGraphy.XSmallLink>

      <TextInput.Medium width={270} />
      <TextInput.Large width={360} />
      <Button size="md">버튼1</Button>
      <Button size="md" disabled={true}>
        버튼2
      </Button>
      <Button></Button>
      <Button className="btn">버튼3</Button>
      <Button size="lg" onClick={clickHandler}>
        큰 버튼
      </Button>
      <Button bgColor="titleActive">Github 로그인</Button>
    </Wrapper>
  );
};
