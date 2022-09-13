import React, { useCallback, useEffect } from 'react';
import { toast } from '../components/Base';
import { useWorker } from '../hooks';
import { GET_LIKE, SEND_LIKE } from '../utils/constant';

export const LikeNotifyContext = React.createContext<{
  notify: (itemId: number) => void;
}>(null!);

export const LikeNotifyProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const worker = useWorker();
  const notify = useCallback(
    (itemId: number) => {
      worker.port.postMessage(
        JSON.stringify({ event: SEND_LIKE, data: { itemId } }),
      );
    },
    [worker],
  );

  const listen = useCallback((e: any) => {
    const { event, data } = e.data;

    if (event === GET_LIKE) {
      const { likeUser, itemTitle } = data;
      toast(`${likeUser}님이 ${itemTitle}에 대해 좋아요를 눌러주셨습니다.`);
    }
  }, []);

  useEffect(() => {
    worker.port.addEventListener('message', listen);
    worker.port.start();

    return () => worker.port.removeEventListener('message', listen);
  }, [listen, worker]);

  return (
    <LikeNotifyContext.Provider value={{ notify }}>
      {children}
    </LikeNotifyContext.Provider>
  );
};
