import React, { Dispatch, ReactNode, useState } from 'react';
import { ItemTypes } from '../hooks/useHomeItem';

export const HomeItemContext = React.createContext<{
  items: ItemTypes[];
  setItems: Dispatch<ItemTypes[]>;
  isLoading: boolean;
  setIsLoading: Dispatch<boolean>;
}>(null!);

export const HomeItemProvider = ({
  children,
  initialItems = [],
  initialItemLoading = true,
}: {
  children: ReactNode;
  initialItems?: ItemTypes[];
  initialItemLoading?: boolean;
}) => {
  const [items, setItems] = useState<ItemTypes[]>(initialItems);
  const [isLoading, setIsLoading] = useState(initialItemLoading);

  return (
    <HomeItemContext.Provider
      value={{ items, setItems, isLoading, setIsLoading }}
    >
      {children}
    </HomeItemContext.Provider>
  );
};
