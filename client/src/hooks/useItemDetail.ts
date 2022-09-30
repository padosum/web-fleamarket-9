import { useEffect, useState } from 'react';
import { fetchItemDetail } from '../remotes/item/fetch-item-detail';

export const useItemDetail = (itemId: string | undefined) => {
  const [item, setItem] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getItemDetail = async () => {
      try {
        const itemInfo = await fetchItemDetail(itemId!);
        setItem(itemInfo);
        setIsLoading(false);
      } catch (err) {
      } finally {
      }
    };

    getItemDetail();
  }, []);

  return { item, setItem, isLoading };
};
