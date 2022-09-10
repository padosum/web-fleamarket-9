import { useContext } from 'react';
import { HomeItemContext } from '../context/HomeItemContext';

export type ItemTypes = {
  idx: number;
  title: string;
  chatRoomCount: number;
  likeCount: number;
  image: string;
  isLike: boolean;
  location: string;
  updatedAt: string;
  price: number;
};

export const useHomeItem = () => {
  const { items, setItems, isLoading, setIsLoading } =
    useContext(HomeItemContext);

  return { items, isLoading, setItems, setIsLoading };
};
