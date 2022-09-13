import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { useHomeItemFetch } from '../hooks/useHomeItemFetch';
import { useHomeItem } from '../hooks/useHomeItem';
import { useLikedItemFetch } from '../hooks/useLikedItemFetch';
import { useMyLocations } from '../hooks/useMyLocations';
import { useHomeMenuOpenStates } from '../hooks/useHomeMenuOpenStates';
import { HomeView } from '../components/Home/HomeView';
import { listenForOutsideClicks } from '../utils/util';

export const Home = () => {
  const { myLocations } = useMyLocations();
  const navigate = useNavigate();
  const {
    onCategoryClick,
    onMenuClick,
    onMyLocationChange,
    setIsLocationedOpened,
    currentLocationName,
    isLocationOpened,
    isCategoryOpened,
    isMenuOpened,
    categoryId,
    locationId,
  } = useHomeMenuOpenStates(navigate, myLocations);

  const locationRef = useRef(null);
  const [listening, setListening] = useState(false);

  const { isLoggedIn } = useAuthContext('Login');

  const { getItems: getHomeItems } = useHomeItemFetch(
    categoryId!,
    locationId!,
    true,
  );
  useLikedItemFetch();
  const { items: homeItems, isLoading: isItemLoading } = useHomeItem();

  const products = useMemo(() => {
    return homeItems.map((item) => {
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
  }, [homeItems]);

  useEffect(
    listenForOutsideClicks({
      listening,
      setListening,
      menuRef: locationRef,
      setIsOpen: setIsLocationedOpened,
    }),
  );

  return (
    <HomeView
      getHomeItems={getHomeItems}
      onCategoryClick={onCategoryClick}
      onMenuClick={onMenuClick}
      isItemLoading={isItemLoading}
      isLoggedIn={isLoggedIn}
      location={myLocations}
      locationRef={locationRef}
      navigate={navigate}
      isLocationOpened={isLocationOpened}
      products={products}
      setIsLocationedOpened={setIsLocationedOpened}
      currentLocationName={currentLocationName}
      handleChangeLocation={onMyLocationChange}
      locationId={locationId!}
      openCategory={isCategoryOpened!}
      openMenu={isMenuOpened!}
    />
  );
};
