import React from 'react';
import { Components, Home, Login, Main, Signup, User } from './pages';
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
        <Route path="/home" element={<Home />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </PageLayout>
  );
}

export default App;
