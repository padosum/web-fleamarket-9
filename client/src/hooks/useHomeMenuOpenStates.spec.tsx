import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import { useHomeMenuOpenStates } from './useHomeMenuOpenStates';

/* 테스팅용 컴포넌트 */
const App = ({
  myLocations,
}: {
  myLocations: Array<{ idx: number; name: string }>;
}) => {
  const navigate = useNavigate();
  const {
    categoryId,
    currentLocationName,
    isCategoryOpened,
    isLocationOpened,
    isMenuOpened,
    locationId,
    onCategoryClick,
    onMenuClick,
    onMyLocationChange,
  } = useHomeMenuOpenStates(navigate, myLocations);

  return (
    <div>
      <div>categoryId: {categoryId}</div>
      {!categoryId && <div>카테고리 아이디 없음</div>}
      <div>locationId: {locationId}</div>
      {!locationId && <div>로케이션 아이디 없음</div>}
      <div>현재동네: {currentLocationName ? currentLocationName : '없음'}</div>

      <div>
        <button onClick={onCategoryClick}>카테고리열기</button>
        {isCategoryOpened && <div>카테고리열림</div>}
      </div>

      <div>
        <button onClick={onMenuClick}>메뉴열기</button>
        {isMenuOpened && <div>메뉴열림</div>}
      </div>

      <div>
        {isLocationOpened && <div>로케이션열림</div>}
        <div>
          {myLocations.map((myLocation) => {
            return (
              <label htmlFor={myLocation.name} key={myLocation.idx}>
                {myLocation.name}
                <input
                  type="radio"
                  onChange={onMyLocationChange.bind(null, myLocation.idx)}
                  id={myLocation.name}
                />
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
};

describe('useHomeMenuOpenStates 훅 테스트', () => {
  /* 로케이션 아이디 반환 테스트 */
  describe('올바른 로케이션 아이디 반환', () => {
    test('locationId가 있을때 (123)', async () => {
      window.history.pushState(null, '', '/home?locationId=123');
      render(
        <BrowserRouter>
          <App myLocations={[]} />
        </BrowserRouter>,
      );

      expect(await screen.findByText(/locationId: 123/)).toBeInTheDocument();
    });

    test('locationId가 없을 때', async () => {
      window.history.pushState(null, '', '/home?locationId=');
      render(
        <BrowserRouter>
          <App myLocations={[]} />
        </BrowserRouter>,
      );

      expect(
        await screen.findByText(/로케이션 아이디 없음/),
      ).toBeInTheDocument();
    });

    test('locationId가 있으나 다른 쿼리스트링과 함께 있을 때', async () => {
      window.history.pushState(null, '', '/home?locationId=123&categoryId=3');
      render(
        <BrowserRouter>
          <App myLocations={[]} />
        </BrowserRouter>,
      );

      expect(await screen.findByText(/locationId: 123/)).toBeInTheDocument();
    });
  });

  /* 카테고리 아이디 반환 테스트 */
  describe('올바른 카테고리 아이디 반환', () => {
    test('categoryId가 있을때 (123)', async () => {
      window.history.pushState(null, '', '/home?category=123');
      render(
        <BrowserRouter>
          <App myLocations={[]} />
        </BrowserRouter>,
      );

      expect(await screen.findByText(/categoryId: 123/)).toBeInTheDocument();
    });

    test('categoryId가 없을 때', async () => {
      window.history.pushState(null, '', '/home?category=');
      render(
        <BrowserRouter>
          <App myLocations={[]} />
        </BrowserRouter>,
      );

      expect(
        await screen.findByText(/카테고리 아이디 없음/),
      ).toBeInTheDocument();
    });

    test('categoryId가 있으나 다른 쿼리스트링과 함께 있을 때', async () => {
      window.history.pushState(null, '', '/home?locationId=123&category=3');
      render(
        <BrowserRouter>
          <App myLocations={[]} />
        </BrowserRouter>,
      );

      expect(await screen.findByText(/categoryId: 3/)).toBeInTheDocument();
    });
  });

  /* 동네 이름 테스트 */
  describe('올바른 동네이름 반환', () => {
    test('동네 목록과 locationId 매칭되는 것이 없을 때', async () => {
      window.history.pushState(null, '', '/home?locationId=123');
      render(
        <BrowserRouter>
          <App
            myLocations={[
              { idx: 1, name: '방이동' },
              { idx: 999, name: '동네설정하기' },
            ]}
          />
        </BrowserRouter>,
      );

      expect(await screen.findByText(/현재동네: 없음/)).toBeInTheDocument();
    });

    test('동네 목록과 locationId 매칭되는 것이 있을 때', async () => {
      window.history.pushState(null, '', '/home?locationId=1');
      render(
        <BrowserRouter>
          <App
            myLocations={[
              { idx: 1, name: '방이동' },
              { idx: 999, name: '동네설정하기' },
            ]}
          />
        </BrowserRouter>,
      );

      expect(await screen.findByText(/현재동네: 방이동/)).toBeInTheDocument();
    });
  });

  /* 버튼 동작 테스트 */
  describe('카테고리, 메뉴 버튼 동작 테스트', () => {
    test('카테고리 버튼 클릭 전, 후', async () => {
      render(
        <BrowserRouter>
          <App
            myLocations={[
              { idx: 1, name: '방이동' },
              { idx: 999, name: '동네설정하기' },
            ]}
          />
        </BrowserRouter>,
      );
      const user = userEvent.setup();

      expect(screen.queryByText(/카테고리열림/)).not.toBeInTheDocument();
      await user.click(screen.getByRole('button', { name: '카테고리열기' }));
      expect(await screen.findByText(/카테고리열림/)).toBeInTheDocument();
    });

    test('메뉴 버튼 클릭 전, 후', async () => {
      render(
        <BrowserRouter>
          <App
            myLocations={[
              { idx: 1, name: '방이동' },
              { idx: 999, name: '동네설정하기' },
            ]}
          />
        </BrowserRouter>,
      );
      const user = userEvent.setup();

      expect(screen.queryByText(/메뉴열림/)).not.toBeInTheDocument();
      await user.click(screen.getByRole('button', { name: '메뉴열기' }));
      expect(await screen.findByText(/메뉴열림/)).toBeInTheDocument();
    });
  });

  /* 동네 변경 및 동네 설정 클릭 */
  describe('동네 변경 및 동네 설정 클릭 테스트', () => {
    test('방이동으로 로케이션 이동', async () => {
      window.history.pushState(null, '', '/home');

      render(
        <BrowserRouter>
          <App
            myLocations={[
              { idx: 1, name: '방이동' },
              { idx: 999, name: '동네설정하기' },
            ]}
          />
        </BrowserRouter>,
      );
      const user = userEvent.setup();

      expect(
        await screen.findByText(/^카테고리 아이디 없음$/),
      ).toBeInTheDocument();
      await user.click(screen.getByRole('radio', { name: '방이동' }));

      expect(await screen.findByText(/^locationId: 1$/)).toBeInTheDocument();
    });
  });
});
