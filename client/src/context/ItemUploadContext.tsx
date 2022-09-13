import React, { useCallback, useEffect } from 'react';
import { toast } from '../components/Base';
import { ITEM_UPLOADED } from '../utils/constant';
import { useWorker } from './WorkerContext';

const ItemUploadContext = React.createContext<null>(null!);

export const ItemUploadProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const worker = useWorker();

  const listen = useCallback((e: any) => {
    const { event, data } = e.data;

    if (event === ITEM_UPLOADED) {
      const { title, locationName } = data;
      toast(`${locationName}에 새로운 아이템(${title})이 등록되었습니다.`);
    }
  }, []);

  useEffect(() => {
    worker.port.addEventListener('message', listen);
    worker.port.start();

    return () => worker.port.removeEventListener('message', listen);
  }, [listen, worker]);

  return (
    <ItemUploadContext.Provider value={null}>
      {children}
    </ItemUploadContext.Provider>
  );
};
