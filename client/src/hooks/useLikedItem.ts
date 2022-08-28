import { useContext } from 'react';
import { LikeItemContext } from '../context/LikeItemContext';

export const useLikedItem = () => {
  const { items, setItems, isLoading, setIsLoading } =
    useContext(LikeItemContext);

  return { items, isLoading, setItems, setIsLoading };
};
