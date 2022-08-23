import React, { useState } from 'react';
import styled from 'styled-components';
import { Button } from '../components/Button';
import { CategoryButton } from '../components/CategoryButton';
import { ChatBadge } from '../components/ChatBadge';
import { ChatBubble } from '../components/ChatBubble';
import { Fab } from '../components/Fab';
import { Icon } from '../components/Icon';
import { LocationButton } from '../components/LocationButton';
import { StatusButton } from '../components/StatusButton';
import { TabBar } from '../components/TabBar';
import { TextInput } from '../components/TextInput';
import { TypoGraphy } from '../components/TypoGraphy';
import { ImgNavigation } from '../components/ImgNavigation';
import { Dropdown } from '../components/Dropdown';
import { CategoryListItem } from '../components/CategoryListItem';

const Wrapper = styled.div`
  width: 100%;
`;

const clickHandler = () => {
  console.log('click');
};

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  console.log(e.target.value);
};

const status = [
  { idx: 1, name: '판매중' },
  { idx: 2, name: '예약중' },
  { idx: 3, name: '판매완료' },
];

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

const tabs = [
  {
    idx: 1,
    title: '판매목록',
  },
  {
    idx: 2,
    title: '채팅',
  },
  {
    idx: 3,
    title: '관심목록',
  },
];

const location = [
  { idx: 1, name: '방이동' },
  { idx: 99999, name: '내 동네 설정하기' },
];

export const Home = () => {
  console.log('home');

  const [navIdx, setNavIdx] = useState(0);
  const [currentTab, setCurrentTab] = useState(tabs[0].idx);
  const [openStatus, setOpenStatus] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(status[0].idx);

  const handleTabChange = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!(e.target instanceof HTMLButtonElement)) {
      return;
    }
    setCurrentTab(+e.target.value);
  };

  const handleStatusToggle = (e: React.MouseEvent<HTMLDivElement>) => {
    setOpenStatus((prevOpenStatus) => !prevOpenStatus);
  };

  const handleStatusChange = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!(e.target instanceof HTMLDivElement)) {
      return;
    }

    if (!e.target.dataset.idx) {
      return;
    }

    setOpenStatus((prevOpenStatus) => !prevOpenStatus);
    setCurrentStatus(+e.target.dataset.idx);
  };

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

      <div style={{ margin: '10px 0px' }}>
        <StatusButton
          status={status}
          select={currentStatus}
          open={openStatus}
          handleToggle={handleStatusToggle}
          handleChange={handleStatusChange}
        ></StatusButton>
      </div>

      <div style={{ width: '320px', margin: '10px 0px' }}>
        <TabBar
          tabs={tabs}
          select={currentTab}
          onClick={handleTabChange}
        ></TabBar>
      </div>

      <div style={{ backgroundColor: 'black' }}>
        <ImgNavigation totalCount={5} index={navIdx} onClick={setNavIdx} />
      </div>

      <div
        style={{
          width: 40,
          height: 40,
          position: 'relative',
          backgroundColor: 'green',
          left: 10,
          top: 10,
        }}
      >
        <ChatBadge count={9999} />
      </div>
      <ChatBubble.TypeA text="상대방의 말" />
      <ChatBubble.TypeA text="엄청 긴 텍스트엄청 긴 텍스트엄청 긴 텍스트엄청 긴 텍스트엄청 긴 텍스트엄청 긴 텍스트엄청 긴 텍스트엄청 긴 텍스트엄청 긴 텍스트엄청 긴 텍스트엄청 긴 텍스트엄청 긴 텍스트엄청 긴 텍스트엄청 긴 텍스트엄청 긴 텍스트엄청 긴 텍스트엄청 긴 텍스트엄청 긴 텍스트엄청 긴 텍스트엄청 긴 텍스트엄청 긴 텍스트엄청 긴 텍스트엄청 긴 텍스트엄청 긴 텍스트엄청 긴 텍스트엄청 긴 텍스트엄청 긴 텍스트엄청 긴 텍스트엄청 긴 텍스트엄청 긴 텍스트" />
      <ChatBubble.TypeB text="내가 한 말" />
      <ChatBubble.TypeB text="엄청 긴 텍스트엄청 긴 텍스트엄청 긴 텍스트엄청 긴 텍스트엄청 긴 텍스트엄청 긴 텍스트엄청 긴 텍스트엄청 긴 텍스트엄청 긴 텍스트엄청 긴 텍스트엄청 긴 텍스트엄청 긴 텍스트엄청 긴 텍스트엄청 긴 텍스트엄청 긴 텍스트엄청 긴 텍스트엄청 긴 텍스트엄청 긴 텍스트엄청 긴 텍스트엄청 긴 텍스트엄청 긴 텍스트엄청 긴 텍스트엄청 긴 텍스트엄청 긴 텍스트엄청 긴 텍스트엄청 긴 텍스트엄청 긴 텍스트엄청 긴 텍스트엄청 긴 텍스트엄청 긴 텍스트" />

      <div style={{ width: '200px', position: 'relative' }}>
        <Dropdown
          items={location}
          select={0}
          handleChange={() => {}}
        ></Dropdown>
      </div>

      <div style={{ transform: 'translateX(300px)' }}>
        <CategoryListItem text="신발" onClick={(e) => console.log(e)} />
      </div>
    </Wrapper>
  );
};
