import React from 'react';
import { Home, Login } from './pages';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { PageLayout } from './components/PageLayout';
import './styles/App.scss';

function App() {
  return (
    <BrowserRouter>
      <PageLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </PageLayout>
    </BrowserRouter>
  );
}

export default App;
