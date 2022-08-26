import React from 'react';
import {
  Components,
  Home,
  Login,
  Main,
  Signup,
  User,
  Write,
  Location,
  LocationSearch,
  Detail,
} from './pages';
import { Route, Routes, Navigate } from 'react-router-dom';
import { PageLayout } from './components/PageLayout';
import './styles/App.scss';
import { useAuthContext } from './context/AuthContext';

function App() {
  const { isLoggedIn } = useAuthContext();

  return (
    <PageLayout>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/components" element={<Components />} />
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
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </PageLayout>
  );
}

export default App;
