import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
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

export const useItem = (categoryId?: string, locationId?: string) => {
  const { items, setItems, isLoading, setIsLoading } =
    useContext(HomeItemContext);

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

  return { items, isLoading, setItems };
};
