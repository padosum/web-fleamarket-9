import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { AUTH } from '../utils/constant';
import { useWorker } from './WorkerContext';

interface Location {
  userId: number;
  locationId: number;
  locationName: string;
  locationCode: string;
}
interface User {
  idx: number;
  id: string;
  name: string;
  location: Location[];
}

interface AuthContextValue {
  user: User | null;
  isLoggedIn: boolean;
  login: (user: User) => void;
  logout: () => Promise<boolean>;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

export function useAuthContext(component?: string) {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(`<${component}/> is not child of ContextProvider`);
  }
  return context;
}

interface Props {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const worker = useWorker();

  const getMyInfo = async () => {
    const { data } = await axios.get<User>('/api/users/me');
    return data;
  };

  const login = (user: User) => {
    setUser(user);
    setIsLoggedIn(true);
    worker.port.postMessage(JSON.stringify({ event: AUTH, data: user.idx }));
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
