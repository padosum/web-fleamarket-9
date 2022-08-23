import React from 'react';
import styled from 'styled-components';
import { Button } from '../components/Button';
import { CategoryButton } from '../components/CategoryButton';
import { Fab } from '../components/Fab';
import { Icon } from '../components/Icon';
import { LocationButton } from '../components/LocationButton';
import { TextInput } from '../components/TextInput';
import { TypoGraphy } from '../components/TypoGraphy';

const Wrapper = styled.div`
  width: 100%;
`;

const clickHandler = () => {
  console.log('click');
};

const categories = [
  {
    idx: 1,
    name: '디지털기기',
  },
  {
    idx: 2,
    name: '생활가전',
  },
  {
    idx: 3,
    name: '가구/인테리어',
  },
  {
    idx: 4,
    name: '게임/취미',
  },
  {
    idx: 5,
    name: '생활/가공식품',
  },
  {
    idx: 6,
    name: '스포츠/레저',
  },
  {
    idx: 7,
    name: '여성패션/잡화',
  },
  {
    idx: 8,
    name: '남성패션/잡화',
  },
  {
    idx: 9,
    name: '유아동',
  },
  {
    idx: 10,
    name: '뷰티/미용',
  },
  {
    idx: 11,
    name: '반려동물',
  },
  {
    idx: 12,
    name: '도서/티켓/음반',
  },
];

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  console.log(e.target.value);
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

      <Fab onClick={clickHandler} />
      <Fab className="fab1" disabled={true} />

      <div style={{ display: 'flex', gap: '2px' }}>
        <LocationButton
          className="locationBtn"
          onClick={clickHandler}
        ></LocationButton>
        <LocationButton title="방이동" onClick={clickHandler}></LocationButton>
      </div>

      <CategoryButton
        categories={categories}
        onChange={handleChange}
      ></CategoryButton>
    </Wrapper>
  );
};
