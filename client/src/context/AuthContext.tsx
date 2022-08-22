import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface User {
  idx: number;
  id: string;
  name: string;
}

interface AuthContextValue {
  user: User | null;
  isLoggedIn: boolean;
  login: (user: User) => void;
  logout: () => void;
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

  const getMyInfo = async () => {
    const { data } = await axios.get<User>('/api/users/me');
    return data;
  };

  const login = (user: User) => {
    setUser(user);
    setIsLoggedIn(true);
  };

  const logout = async () => {
    const { data } = await axios.post('/api/auth/logout');
    if (data.message) {
      setUser(null);
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    // getMyInfo()
    //   .then((data) => {
    //     login(data);
    //   })
    //   .catch(() => {})
    //   .finally(() => {
    //     setIsLoading(false);
    //   });
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
