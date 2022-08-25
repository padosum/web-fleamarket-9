import axios from 'axios';
import { useEffect, useState } from 'react';
import { ItemTypes } from './useItem';

export const useLikedItem = () => {
  const [items, setItems] = useState<ItemTypes[]>([]);

  const getItems = async () => {
    const res = await axios.get('/api/item/liked');

    setItems(
      res.data.map((item: any) => {
        return { ...item, image: item.image.split(',')[0] };
      }),
    );
  };

  useEffect(() => {
    getItems();
  }, []);

  return { items };
};
