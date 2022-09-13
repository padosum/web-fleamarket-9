import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '../components/Base';
import { useWorker } from './WorkerContext';

const ChatNotiContext = React.createContext<null>(null!);

export const ChatNotiProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const worker = useWorker();
  const navigate = useNavigate();

  const listen = (e: any) => {
    const { data } = e;

    if (data?.chatId && window.location.pathname.includes('/chat') === false) {
      const { chatId, message } = data;
      toast(`${message}`, () => navigate(`/chat/${chatId}`));
    }
  };

  useEffect(() => {
    worker.port.addEventListener('message', listen);
    worker.port.start();

    return () => worker.port.removeEventListener('message', listen);
  }, []);

  return (
    <ChatNotiContext.Provider value={null}>{children}</ChatNotiContext.Provider>
  );
};
