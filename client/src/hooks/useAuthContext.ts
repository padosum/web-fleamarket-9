import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export function useAuthContext(component?: string) {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(`<${component}/> is not child of ContextProvider`);
  }
  return context;
}
