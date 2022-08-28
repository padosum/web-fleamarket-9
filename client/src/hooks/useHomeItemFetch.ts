import axios from 'axios';
import { useEffect, useRef } from 'react';
import { useItem } from './useItem';

let lastPage = 1;
let lastCategoryId: any = null;
let lastLocationId: any = null;
let fetchedPages: number[] = [];
export const useHomeItemFetch = (categoryId?: string, locationId?: string) => {
  const page = useRef(lastPage);
  const { setIsLoading, setItems, items } = useItem();

  const getItems = async () => {
    let overwrite = false;
    if (lastCategoryId !== categoryId || lastLocationId !== locationId) {
      fetchedPages = [];
      page.current = 1;
      overwrite = true;
      window.scrollTo(0, 0);
    }

    if (fetchedPages.includes(page.current)) return;

    lastPage = page.current;
    lastCategoryId = categoryId;
    lastLocationId = locationId;
    fetchedPages.push(page.current);

    const res = await axios.get('/api/item', {
      params: {
        categoryId,
        locationId,
        page: page.current,
      },
    });

    if (res.data.length > 0) {
      if (overwrite) {
        setItems(
          res.data.map((item: any) => {
            return { ...item, image: item.images.split(',')[0] };
          }),
        );
      } else {
        setItems([
          ...items,
          ...res.data.map((item: any) => {
            return { ...item, image: item.images.split(',')[0] };
          }),
        ]);
      }

      page.current += 1;
    }

    setIsLoading(false);
  };

  useEffect(() => {
    getItems();
  }, [categoryId, locationId]);

  return { getItems };
};
