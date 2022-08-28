import axios from 'axios';
import { useEffect, useState } from 'react';

export const useItemDetail = (itemId: string | undefined) => {
  const [item, setItem] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getItemDetail = async () => {
      try {
        const { data } = await axios.get(`/api/item/${itemId}`);
        setItem(data);
        setIsLoading(false);
      } catch (err) {
      } finally {
      }
    };

    getItemDetail();
  }, []);

  return { item, setItem, isLoading };
};
