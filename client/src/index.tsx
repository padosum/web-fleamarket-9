import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { ToastMessageContainer } from './components/ToastMessageContainer';
import { AuthProvider } from './context/AuthContext';
import { ItemUploadProvider } from './context/ItemUploadContext';
import { LikeNotifyProvider } from './context/LikeContext';
import { WorkerProvider } from './context/WorkerContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <WorkerProvider>
    <LikeNotifyProvider>
      <ItemUploadProvider>
        <BrowserRouter>
          <AuthProvider>
            <App />
            <ToastMessageContainer />
          </AuthProvider>
        </BrowserRouter>
      </ItemUploadProvider>
    </LikeNotifyProvider>
  </WorkerProvider>,
);
