import { useCallback, useEffect, useState } from 'react';
import { User } from '../../context/AuthContext';
import { comma } from '../../utils/util';
import { fetchItemDetail } from '../../remotes/item/fetch-item-detail';

export type InfoTypes = {
  imgUrls: string[];
  title: string;
  price: string;
  contents: string;
  location: string;
  category: number;
  locationId: number;
};

export const useItemWriteDetail = (
  itemId: string | undefined,
  user: User | null,
) => {
  const [info, setInfo] = useState<InfoTypes>({
    imgUrls: [] as string[],
    title: '',
    price: '',
    contents: '',
    location: user!.location[0].locationName,
    category: 0,
    locationId: user!.location[0].locationId,
  });

  const getItemDetail = useCallback(
    async (itemId: string) => {
      const info = await fetchItemDetail(itemId);

      setInfo({
        title: info.title,
        category: info.category,
        contents: info.contents,
        imgUrls: info.images.split(','),
        location: info.location,
        locationId: user!.location[0].locationId,
        price: comma(info.price),
      });
    },
    [setInfo, user],
  );

  useEffect(() => {
    if (itemId) {
      getItemDetail(itemId);
    }
  }, [itemId, getItemDetail]);

  return {
    info,
    setInfo,
  };
};
