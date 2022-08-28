import axios from 'axios';
import React, { Dispatch, PropsWithChildren, useEffect, useState } from 'react';

export const CategoryContext = React.createContext<{
  category: never[];
  setCategory: Dispatch<never[]>;
}>(null!);

export const CategoryProvider = ({ children }: PropsWithChildren) => {
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

  return (
    <CategoryContext.Provider value={{ category, setCategory }}>
      {children}
    </CategoryContext.Provider>
  );
};
