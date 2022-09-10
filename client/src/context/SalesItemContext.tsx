import React, { Dispatch, PropsWithChildren, useState } from 'react';
import { ItemTypes } from '../hooks/useHomeItem';

export const SalesItemContext = React.createContext<{
  items: ItemTypes[];
  setItems: Dispatch<ItemTypes[]>;
  isLoading: boolean;
  setIsLoading: Dispatch<boolean>;
}>(null!);

export const SalesItemProvier = ({ children }: PropsWithChildren) => {
  const [items, setItems] = useState<ItemTypes[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <SalesItemContext.Provider
      value={{ items, setItems, isLoading, setIsLoading }}
    >
      {children}
    </SalesItemContext.Provider>
  );
};
