import { instance } from '../utils/instance';
import { useCallback, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useLikedItem } from './useLikedItem';

export const useLikedItemFetch = () => {
  const { setItems, setIsLoading } = useLikedItem();
  const [searchParams] = useSearchParams();

  const getItems = useCallback(async () => {
    const res = await instance.get('/api/item/liked');

    setItems(
      res.data.map((item: any) => {
        return { ...item, image: item.image.split(',')[0] };
      }),
    );
    setIsLoading(false);
  }, [setItems, setIsLoading]);

  useEffect(() => {
    if (searchParams.get('tab') === '3') {
      getItems();
    }
  }, [searchParams, getItems]);
};
