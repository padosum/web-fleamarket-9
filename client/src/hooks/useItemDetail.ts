import axios from 'axios';
import { useEffect, useState } from 'react';

export const useItemDetail = (itemId: string | undefined) => {
  const [item, setItem] = useState({});

  useEffect(() => {
    const getItemDetail = async () => {
      try {
        const { data } = await axios.get(`/api/item/${itemId}`);
        setItem(data);
      } catch (err) {
      } finally {
      }
    };

    getItemDetail();
  }, []);

  return { item, setItem };
};
