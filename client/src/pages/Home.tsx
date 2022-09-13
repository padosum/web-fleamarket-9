import {
  useAuthContext,
  useHomeItemFetch,
  useHomeItem,
  useLikedItemFetch,
  useMyLocations,
  useHomeMenuOpenStates,
} from '../hooks';
import { HomeView } from '../components/Home/HomeView';

export const Home = () => {
  const { myLocations } = useMyLocations();
  const { isLoggedIn } = useAuthContext('Login');
  const {
    onCategoryClick,
    onMenuClick,
    onUserClick,
    onMapClick,
    onFabButtonClick,
    onMyLocationChange,
    setIsLocationedOpened,
    currentLocationName,
    isLocationOpened,
    isCategoryOpened,
    isMenuOpened,
    categoryId,
    locationId,
  } = useHomeMenuOpenStates(myLocations, isLoggedIn);

  const { getItems: getHomeItems } = useHomeItemFetch(
    categoryId!,
    locationId!,
    true,
  );
  useLikedItemFetch();
  const { products, isLoading: isItemLoading } = useHomeItem();

  return (
    <HomeView
      getHomeItems={getHomeItems}
      onCategoryClick={onCategoryClick}
      onMenuClick={onMenuClick}
      onUserClick={onUserClick}
      onMapClick={onMapClick}
      onFabButtonClick={onFabButtonClick}
      isItemLoading={isItemLoading}
      isLoggedIn={isLoggedIn}
      location={myLocations}
      isLocationOpened={isLocationOpened}
      products={products}
      setIsLocationedOpened={setIsLocationedOpened}
      currentLocationName={currentLocationName}
      handleChangeLocation={onMyLocationChange}
      isCategoryOpened={isCategoryOpened!}
      isMenuOpened={isMenuOpened!}
    />
  );
};
