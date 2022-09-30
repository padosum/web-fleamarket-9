import { instance } from '../utils/instance';
import { useEffect } from 'react';
import { useSaleItem } from './useSaleItem';

export const useSaleItemFetch = () => {
  const { setIsLoading, setItems } = useSaleItem();

  const getItems = async () => {
    try {
      const res = await instance.get('/api/item/me');
      setItems(
        res.data.map((item: any) => {
          return { ...item, image: item.images.split(',')[0] };
        }),
      );
    } catch (err) {
      setItems([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getItems();
  }, []);
};
