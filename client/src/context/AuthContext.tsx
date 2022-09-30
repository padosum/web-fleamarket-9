import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import { useHomeItemFetch, useWorker } from '../hooks';
import { AUTH } from '../utils/constant';
import { UserType } from '../types/user';

interface AuthContextValue {
  user: UserType | null;
  isLoggedIn: boolean;
  login: (user: UserType) => void;
  logout: () => Promise<boolean>;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

interface AuthContextProps {
  children: React.ReactNode;
  initialUser?: UserType | null;
  initialLoggedIn?: boolean;
  initialLoading?: boolean;
}

export const AuthProvider = ({
  children,
  initialUser = null,
  initialLoggedIn = false,
  initialLoading = true,
}: AuthContextProps) => {
  const [user, setUser] = useState<UserType | null>(initialUser);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(initialLoggedIn);
  const [isLoading, setIsLoading] = useState<boolean>(initialLoading);
  const { resetCategoryLocationId } = useHomeItemFetch();
  const worker = useWorker();

  const getMyInfo = async () => {
    const { data } = await axios.get<UserType>('/api/users/me');
    return data;
  };

  const login = (user: UserType) => {
    setUser(user);
    setIsLoggedIn(true);
    worker.port.postMessage(JSON.stringify({ event: AUTH, data: user.idx }));
    resetCategoryLocationId();
  };

  const logout = async () => {
    await axios.post('/api/auth/logout').catch((err) => {
      if (err.response) {
        alert(err.response.data);
      } else if (err.request) {
        alert(err.request);
      } else {
        alert(err.message);
      }
    });
    setUser(null);
    setIsLoggedIn(false);
    worker.port.postMessage(JSON.stringify({ event: AUTH, data: null }));

    return true;
  };

  useEffect(() => {
    getMyInfo()
      .then((data) => {
        login(data);
      })
      .catch(() => {})
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return null;
  }

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthContext.displayName = 'AuthContext';
