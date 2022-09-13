import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { useSaleItemFetch } from '../../hooks/useSaleItemFetch';
import { colors } from '../Color';
import { BackHeader } from '../Header/BackHeader';
import { TabBar } from '../Base';
import { ChattingList } from './ChattingList';
import { LikedList } from './LikedList';
import { SalesList } from './SalesList';

const MenuSlideWrapper = styled.div<{ open: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${colors.white};

  overflow-y: auto;

  @supports (-webkit-touch-callout: none) {
    height: -webkit-fill-available;
  }

  transition: transform 0.3s cubic-bezier(0, 0.52, 0, 1);
  transform: ${({ open }) =>
    open ? `translate3d(0vw, 0, 0);` : `translate3d(100vw, 0, 0)`};
`;

const HeaderWrapper = styled.div`
  width: 100%;
  max-width: 100%;
  position: sticky;
  top: 0;
  z-index: 99;
`;

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

export const MenuSlide = ({ open }: { open: boolean }) => {
  const navigate = useNavigate();
  const [searchPrams, setSearchParams] = useSearchParams();
  const currentTab = searchPrams.get('tab') ? +searchPrams.get('tab')! : 1;

  useSaleItemFetch();

  const handleTabChange = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!(e.target instanceof HTMLButtonElement)) {
      return;
    }

    searchPrams.set('tab', e.target.value);
    setSearchParams(searchPrams, { replace: true });
  };

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
  }, [open]);

  return (
    <MenuSlideWrapper open={open}>
      <HeaderWrapper>
        <BackHeader
          title={'메뉴'}
          color="offWhite"
          onClickBack={navigate.bind(null, -1)}
        />
        <TabBar tabs={tabs} select={currentTab} onClick={handleTabChange} />
      </HeaderWrapper>

      {currentTab === 1 && <SalesList />}
      {currentTab === 2 && <ChattingList />}
      {currentTab === 3 && <LikedList />}
    </MenuSlideWrapper>
  );
};
