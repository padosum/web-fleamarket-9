import React, { MouseEventHandler, useEffect, useRef, useState } from 'react';
import {
  FabButtonWrapper,
  HeaderWrapper,
  HomeWrapper,
  ProductWrapper,
} from './HomeView.styled';
import { CategorySlide } from '../Category/CategorySlide';
import { Dropdown, Fab, ItemSkeleton, ProductList } from '../Base';
import { MainHeader } from '../Header/MainHeader';
import { EmptyText } from '../Menu/Common';
import { MenuSlide } from '../Menu/MenuSlide';
import { listenForOutsideClicks } from '../../utils/util';

type HomeViewProps = {
  currentLocationName?: string;
  onCategoryClick: MouseEventHandler;
  onMenuClick: MouseEventHandler;
  onMapClick: MouseEventHandler;
  onUserClick: MouseEventHandler;
  onFabButtonClick: MouseEventHandler;
  setIsLocationedOpened: React.Dispatch<React.SetStateAction<boolean>>;
  isLoggedIn: boolean;
  isLocationOpened: boolean;
  location: Array<{ idx: number; name: string }>;
  handleChangeLocation?: Function;
  isCategoryOpened?: string;
  isMenuOpened?: string;
  isItemLoading: boolean;
  products: Array<{
    idx: number;
    title: string;
    location: string;
    timestamp: string;
    price: number;
    likeCnt: number;
    messageCnt: number;
    image: string;
    thumbnail: string;
    isLiked: boolean;
  }>;
  getHomeItems: Function;
};

const DEFAULT_LOCATION_NAME = '장소';

export const HomeView = ({
  currentLocationName = DEFAULT_LOCATION_NAME,
  onCategoryClick,
  onMapClick,
  onUserClick,
  onFabButtonClick,
  setIsLocationedOpened,
  isLoggedIn,
  onMenuClick,
  isLocationOpened,
  location,
  handleChangeLocation,
  isCategoryOpened,
  isMenuOpened,
  isItemLoading,
  products,
  getHomeItems,
}: HomeViewProps) => {
  const locationRef = useRef<HTMLDivElement>(null!);
  const [listening, setListening] = useState(false);

  useEffect(
    listenForOutsideClicks({
      listening,
      setListening,
      menuRef: locationRef,
      setIsOpen: setIsLocationedOpened,
    }),
  );
  return (
    <HomeWrapper>
      <HeaderWrapper>
        <MainHeader
          title={currentLocationName}
          color={'primary'}
          onClickCategory={onCategoryClick}
          onClickMap={onMapClick}
          onClickUser={onUserClick}
          onClickMenu={onMenuClick}
          ref={locationRef}
        />
        {isLocationOpened && (
          <Dropdown
            items={location}
            select={0}
            handleChange={handleChangeLocation}
            left={'center'}
          />
        )}
      </HeaderWrapper>
      <CategorySlide open={!!isCategoryOpened} />
      <MenuSlide open={!!isMenuOpened} />

      <ProductWrapper>
        {isItemLoading ? (
          <>
            <ItemSkeleton />
            <ItemSkeleton />
            <ItemSkeleton />
          </>
        ) : products.length > 0 ? (
          <ProductList
            getItems={getHomeItems}
            items={products}
            type="shopping"
            isFlatList={true}
          />
        ) : (
          <div style={{ height: 'calc(100vh - 56px)' }}>
            <EmptyText>아이템이 없습니다.</EmptyText>
          </div>
        )}
      </ProductWrapper>
      {isLoggedIn && (
        <FabButtonWrapper>
          <Fab onClick={onFabButtonClick} role="item-add-button" />
        </FabButtonWrapper>
      )}
    </HomeWrapper>
  );
};
