import axios from 'axios';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { CategorySlide } from '../components/Category/CategorySlide';
import { Dropdown } from '../components/Dropdown';
import { Fab } from '../components/Fab';
import { MainHeader } from '../components/Header/MainHeader';
import { ItemSkeleton } from '../components/ItemSkeleton';
import { EmptyText } from '../components/Menu/Common';
import { MenuSlide } from '../components/Menu/MenuSlide';
import { ProductList } from '../components/ProductList';
import { useAuthContext } from '../context/AuthContext';
import { useHomeItemFetch } from '../hooks/useHomeItemFetch';
import { useItem } from '../hooks/useItem';
import { useLikedItemFetch } from '../hooks/useLikedItemFetch';
import useScrollCache from '../hooks/useScrollCache';
import listenForOutsideClicks from '../utils/util';

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

export const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [openLocation, setOpenLocation] = useState(false);

  const openCategory = searchParams.get('openCategory');
  const openMenu = searchParams.get('menu');

  const [location, setLocation] = useState([]);
  const [currentLocationName, setCurrentLocationName] = useState('');

  const locationRef = useRef(null);
  const [listening, setListening] = useState(false);

  const { isLoggedIn } = useAuthContext('Login');
  const navigate = useNavigate();

  const windowLocation = useLocation();

  const { containerRef, onScroll } = useScrollCache(
    windowLocation.pathname + windowLocation.search,
  );

  const [categoryId, locationId] = useMemo(() => {
    const urlParams = new URLSearchParams(windowLocation.search);
    return ['category', 'locationId'].map((key) => urlParams.get(key));
  }, [windowLocation.search]);

  const { getItems: getHomeItems } = useHomeItemFetch(
    categoryId!,
    locationId!,
    true,
  );
  useLikedItemFetch();
  const { items, isLoading: isItemLoading } = useItem();

  const products = useMemo(() => {
    return items.map((item) => {
      return {
        idx: item.idx,
        title: item.title,
        location: item.location,
        timestamp: item.updatedAt,
        price: item.price,
        likeCnt: item.likeCount,
        messageCnt: item.chatRoomCount,
        image: item.image,
        isLiked: item.isLike,
      };
    });
  }, [items]);

  const handleChangeLocation = (num: number) => {
    if (num === 999) {
      navigate('/location');
      return;
    }

    const currLocation = location.filter(
      (item: { idx: number; name: string }) => item.idx === num,
    );

    if (currLocation.length > 0) {
      setCurrentLocationName((currLocation[0] as any).name);
    }

    searchParams.set('locationId', `${num}`);
    setSearchParams(searchParams);
    setOpenLocation(false);
  };
  const handleToggleCategory = () => {
    if (openCategory) {
      searchParams.delete('openCategory');
    } else {
      searchParams.set('openCategory', 'true');
    }
    setSearchParams(searchParams);
  };

  const handleToggleMenu = () => {
    if (openMenu) {
      searchParams.delete('menu');
    } else {
      searchParams.set('menu', 'true');
    }
    setSearchParams(searchParams);
  };

  useEffect(
    listenForOutsideClicks({
      listening,
      setListening,
      menuRef: locationRef,
      setIsOpen: setOpenLocation,
    }),
  );

  useEffect(() => {
    const getLocation = async () => {
      try {
        const { data } = await axios.get('/api/location/me');
        const formatLocation = data.map(
          ({ idx, name }: { idx: number; name: string }) => {
            return {
              idx,
              name: name.split(' ')[2],
            };
          },
        );

        formatLocation.push({ idx: 999, name: '내 동네 설정하기' });
        setLocation(formatLocation);
      } catch (err) {}
    };
    getLocation();
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    containerRef.current = window;

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <HomeWrapper>
      <HeaderWrapper>
        <MainHeader
          ref={locationRef}
          title={currentLocationName ? currentLocationName : '장소'}
          color={'primary'}
          onClickCategory={handleToggleCategory}
          onClickMap={() =>
            setOpenLocation((prevOpenLocation) => !prevOpenLocation)
          }
          onClickUser={() => {
            if (isLoggedIn) {
              navigate('/user');
            } else {
              navigate('/login');
            }
          }}
          onClickMenu={handleToggleMenu}
        ></MainHeader>
        {openLocation && (
          <Dropdown
            items={location}
            select={0}
            handleChange={handleChangeLocation}
            left={'100'}
          ></Dropdown>
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
