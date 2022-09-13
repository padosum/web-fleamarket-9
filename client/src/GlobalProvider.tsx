import { PropsWithChildren } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CategoryProvider } from './context/CategoryContext';
import { ChatNotiProvider } from './context/ChatContext';
import { FocusProvider } from './context/FocusContext';
import { HomeItemProvider } from './context/HomeItemContext';
import { ItemUploadProvider } from './context/ItemUploadContext';
import { LikeNotifyProvider } from './context/LikeContext';
import { LikeItemProvider } from './context/LikeItemContext';
import { SalesItemProvier } from './context/SalesItemContext';
import { WorkerProvider } from './context/WorkerContext';

export const GlobalProvider = ({ children }: PropsWithChildren) => {
  return (
    <WorkerProvider>
      <FocusProvider>
        <LikeNotifyProvider>
          <ItemUploadProvider>
            <BrowserRouter>
              <ChatNotiProvider>
                <CategoryProvider>
                  <HomeItemProvider>
                    <LikeItemProvider>
                      <AuthProvider>
                        <SalesItemProvier>{children}</SalesItemProvier>
                      </AuthProvider>
                    </LikeItemProvider>
                  </HomeItemProvider>
                </CategoryProvider>
              </ChatNotiProvider>
            </BrowserRouter>
          </ItemUploadProvider>
        </LikeNotifyProvider>
      </FocusProvider>
    </WorkerProvider>
  );
};
