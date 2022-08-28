import { useContext } from 'react';
import { CategoryContext } from '../context/CategoryContext';

export const useCategory = () => {
  const { category, setCategory } = useContext(CategoryContext);

  return { category, setCategory };
};
