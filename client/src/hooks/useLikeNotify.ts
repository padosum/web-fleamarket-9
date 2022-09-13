import { useContext } from 'react';
import { LikeNotifyContext } from '../context/LikeContext';

export const useLikeNotify = () => {
  const context = useContext(LikeNotifyContext);

  return context;
};
