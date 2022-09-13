import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';
import {
  Detail,
  Home,
  Location,
  LocationSearch,
  Login,
  Main,
  Signup,
  User,
  Write,
} from './pages';
import { ChatDetail } from './pages/ChatDetail';
import { ChatList } from './pages/ChatList';

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
