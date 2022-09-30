import { useCallback, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export const CATEGORY_OPEN_QUERY_STRING = 'isCategoryOpened';
const MENU_OPEN_QUERY_STRING = 'isMenuOpened';
export const LOCATION_ID_QUERY_STRING = 'locationId';
export const CATEGORY_ID_QUERY_STRING = 'category';
const MY_LOCATION_SETTING_PAGE_URL = '/location';
const TRUE = 'true';

/**
 * @description 홈페이지(아이템 리스트가 나오는 페이지)에서 헤더에서 접근할 수 있는 메뉴 관련 상태들을 분리한 hooks입니다.
 * @param navigate 리액트 라우터 네비게이트 함수를 인자로 받습니다.
 * @param myLocations 사용자의 동네 정보입니다. (useMyLocations.ts)
 * @returns
 *  onMyLocationChange,
 *  onCategoryClick,
 *  onMenuClick,
 *  setIsLocationedOpened,
 *  isLocationOpened,
 *  currentLocationName,
 *  isCategoryOpened,
 *  isMenuOpened,
 *  categoryId,
 *  locationId
 */
export const useHomeMenuOpenStates = (
  myLocations: Array<{ idx: number; name: string }>,
  isLoggedIn: boolean,
) => {
  const navigate = useNavigate();
  const [isLocationOpened, setIsLocationedOpened] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const isCategoryOpened = searchParams.get(CATEGORY_OPEN_QUERY_STRING);
  const isMenuOpened = searchParams.get(MENU_OPEN_QUERY_STRING);
  const locationId = searchParams.get(LOCATION_ID_QUERY_STRING);
  const categoryId = searchParams.get(CATEGORY_ID_QUERY_STRING);

  const currentLocationName = useMemo(() => {
    if (locationId) {
      const selectLocation = myLocations.find((loc) => loc.idx === +locationId);

      return selectLocation?.name ?? '';
    }
    return '';
  }, [locationId, myLocations]);

  const onMyLocationChange = useCallback(
    (num: number) => {
      if (num === 999) {
        navigate(MY_LOCATION_SETTING_PAGE_URL);
        return;
      }
      searchParams.set(LOCATION_ID_QUERY_STRING, `${num}`);
      setIsLocationedOpened(false);
      setSearchParams(searchParams);
    },
    [searchParams, navigate, setIsLocationedOpened, setSearchParams],
  );

  const onCategoryClick = useCallback(() => {
    if (isCategoryOpened) {
      searchParams.delete(CATEGORY_OPEN_QUERY_STRING);
    } else {
      searchParams.set(CATEGORY_OPEN_QUERY_STRING, TRUE);
    }
    setSearchParams(searchParams);
  }, [isCategoryOpened, searchParams, setSearchParams]);

  const onMenuClick = useCallback(() => {
    if (isMenuOpened) {
      searchParams.delete(MENU_OPEN_QUERY_STRING);
    } else {
      searchParams.set(MENU_OPEN_QUERY_STRING, TRUE);
    }
    setSearchParams(searchParams);
  }, [isMenuOpened, searchParams, setSearchParams]);

  const onMapClick = () => setIsLocationedOpened((prev) => !prev);
  const onUserClick = () => {
    if (isLoggedIn) {
      navigate('/user');
    } else {
      navigate('/login');
    }
  };

  const onFabButtonClick = () => {
    if (locationId) {
      const currentLocation: any[] = myLocations.filter(
        (item: { idx: number; name: string }) => item.idx === +locationId,
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
      if (myLocations) {
        const { idx, name } = myLocations[0];
        navigate('/item/write', {
          state: {
            locationId: idx,
            locationName: name,
          },
        });
      }
    }
  };

  return {
    onMyLocationChange,
    onCategoryClick,
    onMenuClick,
    onMapClick,
    onUserClick,
    onFabButtonClick,
    setIsLocationedOpened,
    isLocationOpened,
    currentLocationName,
    isCategoryOpened,
    isMenuOpened,
    categoryId,
    locationId,
  };
};
