import { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { CategorySlide } from '../components/Category/CategorySlide';
import { Dropdown } from '../components/Dropdown';
import { Fab } from '../components/Fab';
import { MainHeader } from '../components/Header/MainHeader';
import { MenuSlide } from '../components/Menu/MenuSlide';
import { ProductList } from '../components/ProductList';
import { useAuthContext } from '../context/AuthContext';
import { useItem } from '../hooks/useItem';

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

const location = [
  { idx: 1, name: '방이동' },
  { idx: 99999, name: '내 동네 설정하기' },
];

export const Home = () => {
  const [openLocation, setOpenLocation] = useState(false);
  const [openCategory, setOpenCategory] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const { isLoggedIn } = useAuthContext('Login');
  const navigate = useNavigate();
  const windowLocation = useLocation();

  const [categoryId, locationId] = useMemo(() => {
    const urlParams = new URLSearchParams(windowLocation.search);
    return ['category', 'location'].map((key) => urlParams.get(key));
  }, [windowLocation.search]);

  const { items } = useItem(categoryId!, locationId!);

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

  const handleToggleCategory = () => {
    setOpenCategory((prevOpenCategory) => !prevOpenCategory);
  };

  const handleToggleMenu = () => {
    setOpenMenu((openMenu) => !openMenu);
  };

  return (
    <HomeWrapper>
      <HeaderWrapper>
        <MainHeader
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
            handleChange={() => {}}
            left={'100'}
          ></Dropdown>
        )}
      </HeaderWrapper>

      <CategorySlide open={openCategory} toggleOpen={handleToggleCategory} />

      <MenuSlide open={openMenu} toggleOpen={handleToggleMenu} />

      <ProductWrapper>
        <ProductList items={products} type="shopping" />
      </ProductWrapper>
      {isLoggedIn && (
        <FabButtonWrapper>
          <Fab onClick={() => navigate('/item/write')} />
        </FabButtonWrapper>
      )}
    </HomeWrapper>
  );
};
