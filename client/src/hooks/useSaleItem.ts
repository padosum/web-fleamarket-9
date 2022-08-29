import { useContext } from 'react';
import { SalesItemContext } from '../context/SalesItemContext';

export const useSaleItem = () => {
  const { isLoading, items, setIsLoading, setItems } =
    useContext(SalesItemContext);

  return { items, isLoading, setIsLoading, setItems };
};
