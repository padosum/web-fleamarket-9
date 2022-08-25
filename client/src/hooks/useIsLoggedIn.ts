import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export const useIsLoggedIn = () => {
  const context = useContext(AuthContext);

  return context?.isLoggedIn;
};
