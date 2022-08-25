import axios from 'axios';
import { useEffect, useState } from 'react';

export const useCategory = () => {
  const [category, setCategory] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const { data } = await axios.get('/api/category');
        setCategory(data);
      } catch (err) {
      } finally {
      }
    };

    getCategories();
  }, []);

  return { category, setCategory };
};
