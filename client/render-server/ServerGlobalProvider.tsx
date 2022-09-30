import React, { PropsWithChildren } from 'react';
import { AuthProvider } from '../src/context/AuthContext';
import { CategoryProvider } from '../src/context/CategoryContext';
import { HomeItemProvider } from '../src/context/HomeItemContext';
import { LikeItemProvider } from '../src/context/LikeItemContext';
import { SalesItemProvier } from '../src/context/SalesItemContext';
import { WorkerProvider } from '../src/context/WorkerContext';
import { LikeNotifyProvider } from '../src/context/LikeContext';
import { ItemTypes } from '../src/hooks/useHomeItem';
import { UserType } from '../src/types/user';

export const ServerGlobalProvider = ({
  children,
  initialItems,
  initialLoggedIn,
  initialUser,
}: PropsWithChildren<{
  initialItems?: ItemTypes[];
  initialUser?: UserType | null;
  initialLoggedIn?: boolean;
}>) => {
  return (
    <WorkerProvider>
      <LikeNotifyProvider>
        <CategoryProvider>
          <HomeItemProvider
            initialItems={initialItems}
            initialItemLoading={false}
          >
            <LikeItemProvider>
              <AuthProvider
                initialUser={initialUser}
                initialLoggedIn={initialLoggedIn}
                initialLoading={false}
              >
                <SalesItemProvier>{children}</SalesItemProvier>
              </AuthProvider>
            </LikeItemProvider>
          </HomeItemProvider>
        </CategoryProvider>
      </LikeNotifyProvider>
    </WorkerProvider>
  );
};
