import React, { createContext, useEffect } from 'react';
import { useWorker } from '../hooks';
import { FOCUS } from '../utils/constant';

const FocusContext = createContext<null>(null);

export const FocusProvider = ({ children }: { children: React.ReactNode }) => {
  const worker = useWorker();

  const checkFocus = () => {
    worker.port.postMessage(
      JSON.stringify({
        event: FOCUS,
        data: { isFocused: document.hasFocus() },
      }),
    );
  };

  useEffect(() => {
    Notification.requestPermission();
    const interval = setInterval(checkFocus, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return <FocusContext.Provider value={null}>{children}</FocusContext.Provider>;
};
