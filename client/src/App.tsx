import React from 'react';
import { Components, Home, Login, Main, User } from './pages';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { PageLayout } from './components/PageLayout';
import './styles/App.scss';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <PageLayout>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/components" element={<Components />} />
            <Route path="/login" element={<Login />} />
            <Route path="/user" element={<User />} />
            <Route path="/home" element={<Home />} />
          </Routes>
        </PageLayout>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
