import axios from 'axios';
import { useEffect, useState } from 'react';

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

export const useItem = (categoryId?: string, locationId?: string) => {
  const [items, setItems] = useState<ItemTypes[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getItems = async () => {
    const res = await axios.get('/api/item', {
      params: {
        categoryId,
        locationId,
      },
    });

    setItems(
      res.data.map((item: any) => {
        return { ...item, image: item.image.split(',')[0] };
      }),
    );

    setIsLoading(false);
  };

  useEffect(() => {
    getItems();
  }, [categoryId, locationId]);

  return { items, isLoading };
};
