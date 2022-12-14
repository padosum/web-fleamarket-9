import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuthContext } from './hooks';
import {
  Home,
  Location,
  LocationSearch,
  Login,
  Main,
  Signup,
  User,
  Write,
  ChatDetail,
  ChatList,
} from './pages';
import { Detail } from './pages/Detail';

export const AppRoutes = () => {
  const { isLoggedIn } = useAuthContext();

  return (
    <Routes>
      <Route path="/" element={<Main />} />
      {!isLoggedIn && <Route path="/login" element={<Login />} />}
      {isLoggedIn && <Route path="/user" element={<User />} />}
      {!isLoggedIn && <Route path="/signup" element={<Signup />} />}
      {isLoggedIn && <Route path="/location" element={<Location />} />}
      {isLoggedIn && (
        <Route path="/location/search" element={<LocationSearch />} />
      )}
      <Route path="/home" element={<Home />} />
      <Route path="/item/:id" element={<Detail />} />
      <Route path="/item/write" element={<Write />} />
      <Route path="/item/edit/:id" element={<Write />} />
      <Route path="/chat/:id" element={<ChatDetail />} />
      <Route path="/chat" element={<ChatList />} />
      <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>
  );
};
