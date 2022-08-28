import axios from 'axios';
import { useContext, useEffect } from 'react';
import { LikeItemContext } from '../context/LikeItemContext';

export const useLikedItem = () => {
  const { items, setItems, isLoading, setIsLoading } =
    useContext(LikeItemContext);

  const getItems = async () => {
    const res = await axios.get('/api/item/liked');

    setItems(
      res.data.map((item: any) => {
        return { ...item, image: item.image.split(',')[0] };
      }),
    );
    setIsLoading(false);
  };

  useEffect(() => {
    getItems();
  }, []);

  return { items, isLoading, setItems };
};
