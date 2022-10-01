import { useContext, useMemo } from 'react';
import { HomeItemContext } from '../context/HomeItemContext';

export type ItemTypes = {
  idx: number;
  title: string;
  chatRoomCount: number;
  likeCount: number;
  image: string;
  thumbnail: string;
  isLike: boolean;
  location: string;
  updatedAt: string;
  price: number;
};

export const useHomeItem = () => {
  const { items, setItems, isLoading, setIsLoading } =
    useContext(HomeItemContext);

  const products = useMemo(() => {
    return items.map((item) => {
      return {
        idx: item.idx,
        title: item.title,
        location: item.location,
        timestamp: item.updatedAt,
        price: item.price,
        likeCnt: item.likeCount,
        messageCnt: item.chatRoomCount,
        image: item.image,
        isLiked: item.isLike,
        thumbnail: item.thumbnail,
      };
    });
  }, [items]);

  return { items, products, isLoading, setItems, setIsLoading };
};
