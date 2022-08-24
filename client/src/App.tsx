import React from 'react';
import { Components, Login } from './pages';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { PageLayout } from './components/PageLayout';
import './styles/App.scss';
import { Main } from './pages/Main';

function App() {
  return (
    <BrowserRouter>
      <PageLayout>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/components" element={<Components />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </PageLayout>
    </BrowserRouter>
  );
}

export default App;
