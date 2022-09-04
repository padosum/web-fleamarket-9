import axios from 'axios';
import { useEffect } from 'react';
import { useSaleItem } from './useSaleItem';

export const useSaleItemFetch = () => {
  const { setIsLoading, setItems } = useSaleItem();

  const getItems = async () => {
    const res = await axios.get('/api/item/me');
    setItems(
      res.data.map((item: any) => {
        return { ...item, image: item.images.split(',')[0] };
      }),
    );
    setIsLoading(false);
  };

  useEffect(() => {
    getItems();
  }, []);
};