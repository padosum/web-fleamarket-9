import React, { Dispatch, ReactNode, useState } from 'react';
import { ItemTypes } from '../hooks/useItem';

export const LikeItemContext = React.createContext<{
  items: ItemTypes[];
  setItems: Dispatch<ItemTypes[]>;
  isLoading: boolean;
  setIsLoading: Dispatch<boolean>;
}>(null!);

export const LikeItemProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<ItemTypes[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <LikeItemContext.Provider
      value={{ items, setItems, isLoading, setIsLoading }}
    >
      {children}
    </LikeItemContext.Provider>
  );
};
