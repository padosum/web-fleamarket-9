import React from 'react';
import { Components, Home, Login, Main } from './pages';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { PageLayout } from './components/PageLayout';
import './styles/App.scss';

function App() {
  return (
    <BrowserRouter>
      <PageLayout>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/components" element={<Components />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </PageLayout>
    </BrowserRouter>
  );
}

export default App;
