import axios from 'axios';
import { useEffect, useState } from 'react';
import { ItemTypes } from './useItem';

export const useSaleItem = () => {
  const [items, setItems] = useState<ItemTypes[]>([]);

  const getItems = async () => {
    const res = await axios.get('/api/item/me');
    setItems(
      res.data.map((item: any) => {
        return { ...item, image: item.images.split(',')[0] };
      }),
    );
  };

  useEffect(() => {
    getItems();
  }, []);

  return { items };
};
