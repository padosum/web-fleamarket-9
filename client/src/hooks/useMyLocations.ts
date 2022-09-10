import axios from 'axios';
import { useEffect, useState } from 'react';

export const useMyLocations = () => {
  const [location, setLocation] = useState([]);

  useEffect(() => {
    const getLocation = async () => {
      try {
        const { data } = await axios.get('/api/location/me');
        const formatLocation = data.map(
          ({ idx, name }: { idx: number; name: string }) => {
            return {
              idx,
              name: name.split(' ')[2],
            };
          },
        );

        formatLocation.push({ idx: 999, name: '내 동네 설정하기' });
        setLocation(formatLocation);
      } catch (err) {}
    };
    getLocation();
  }, []);

  return { myLocations: location };
};
