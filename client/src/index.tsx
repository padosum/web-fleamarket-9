import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { ToastMessageContainer } from './components/ToastMessageContainer';
import { AuthProvider } from './context/AuthContext';
import { ChatNotiProvider } from './context/ChatContext';
import { FocusProvider } from './context/FocusContext';
import { HomeItemProvider } from './context/HomeItemContext';
import { ItemUploadProvider } from './context/ItemUploadContext';
import { LikeNotifyProvider } from './context/LikeContext';
import { WorkerProvider } from './context/WorkerContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <WorkerProvider>
    <FocusProvider>
      <LikeNotifyProvider>
        <ItemUploadProvider>
          <BrowserRouter>
            <ChatNotiProvider>
              <AuthProvider>
                <HomeItemProvider>
                  <App />
                  <ToastMessageContainer />
                </HomeItemProvider>
              </AuthProvider>
            </ChatNotiProvider>
          </BrowserRouter>
        </ItemUploadProvider>
      </LikeNotifyProvider>
    </FocusProvider>
  </WorkerProvider>,
);
