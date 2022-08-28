import axios from 'axios';
import { useEffect } from 'react';
import { useItem } from './useItem';

export const useHomeItemFetch = (categoryId?: string, locationId?: string) => {
  const { setIsLoading, setItems } = useItem();

  const getItems = async () => {
    const res = await axios.get('/api/item', {
      params: {
        categoryId,
        locationId,
      },
    });

    setItems(
      res.data.map((item: any) => {
        return { ...item, image: item.images.split(',')[0] };
      }),
    );

    setIsLoading(false);
  };

  useEffect(() => {
    getItems();
  }, [categoryId, locationId]);
};
