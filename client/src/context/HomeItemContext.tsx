import React, { Dispatch, ReactNode, useState } from 'react';
import { ItemTypes } from '../hooks/useItem';

export const HomeItemContext = React.createContext<{
  items: ItemTypes[];
  setItems: Dispatch<ItemTypes[]>;
  isLoading: boolean;
  setIsLoading: Dispatch<boolean>;
}>(null!);

export const HomeItemProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<ItemTypes[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <HomeItemContext.Provider
      value={{ items, setItems, isLoading, setIsLoading }}
    >
      {children}
    </HomeItemContext.Provider>
  );
};
