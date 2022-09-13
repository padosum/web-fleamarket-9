import React, { MouseEventHandler } from 'react';
import { NavigateFunction } from 'react-router-dom';
import styled from 'styled-components';
import { CategorySlide } from '../Category/CategorySlide';
import { Dropdown, Fab, ItemSkeleton, ProductList } from '../Base';
import { MainHeader } from '../Header/MainHeader';
import { EmptyText } from '../Menu/Common';
import { MenuSlide } from '../Menu/MenuSlide';

type HomeViewProps = {
  locationRef: React.MutableRefObject<null>;
  currentLocationName?: string;
  onCategoryClick: MouseEventHandler;
  onMenuClick: MouseEventHandler;
  setIsLocationedOpened: React.Dispatch<React.SetStateAction<boolean>>;
  isLoggedIn: boolean;
  navigate: NavigateFunction;
  isLocationOpened: boolean;
  location: Array<{ idx: number; name: string }>;
  handleChangeLocation?: Function;
  openCategory?: string;
  openMenu?: string;
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
    isLiked: boolean;
  }>;
  getHomeItems: Function;
  locationId?: string;
};

const DEFAULT_LOCATION_NAME = '장소';

export const HomeView = ({
  locationRef,
  currentLocationName = DEFAULT_LOCATION_NAME,
  onCategoryClick,
  setIsLocationedOpened,
  isLoggedIn,
  navigate,
  onMenuClick,
  isLocationOpened,
  location,
  handleChangeLocation,
  openCategory,
  openMenu,
  isItemLoading,
  products,
  getHomeItems,
  locationId,
}: HomeViewProps) => {
  return (
    <HomeWrapper>
      <HeaderWrapper>
        <MainHeader
          ref={locationRef}
          title={currentLocationName}
          color={'primary'}
          onClickCategory={onCategoryClick}
          onClickMap={() => setIsLocationedOpened((prev) => !prev)}
          onClickUser={() => {
            if (isLoggedIn) {
              navigate('/user');
            } else {
              navigate('/login');
            }
          }}
          onClickMenu={onMenuClick}
        ></MainHeader>
        {isLocationOpened && (
          <Dropdown
            items={location}
            select={0}
            handleChange={handleChangeLocation}
            left={'center'}
          />
        )}
      </HeaderWrapper>

      <CategorySlide open={!!openCategory} />

      <MenuSlide open={!!openMenu} />

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
          <Fab
            onClick={() => {
              if (locationId) {
                const currentLocation: any[] = location.filter(
                  (item: { idx: number; name: string }) =>
                    item.idx === +locationId,
                );

                if (currentLocation[0]) {
                  navigate('/item/write', {
                    state: {
                      locationId,
                      locationName: currentLocation[0].name,
                    },
                  });
                }
              } else {
                if (location) {
                  const { idx, name } = location[0];
                  navigate('/item/write', {
                    state: {
                      locationId: idx,
                      locationName: name,
                    },
                  });
                }
              }
            }}
          />
        </FabButtonWrapper>
      )}
    </HomeWrapper>
  );
};

const HomeWrapper = styled.div`
  width: 100%;
  max-width: 100%;
`;

const ProductWrapper = styled.div`
  padding: 0 16px;
`;

const HeaderWrapper = styled.div`
  position: sticky;
  top: 0;
  z-index: 9;
`;

const FabButtonWrapper = styled.div`
  position: fixed;
  right: 16px;
  bottom: 16px;
`;
