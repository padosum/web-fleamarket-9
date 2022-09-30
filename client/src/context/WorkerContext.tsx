import React from 'react';

let worker = {
  addEventListener: () => {},
  dispatchEvent: () => {},
  onerror: null,
  port: {},
  removeEventListener: () => {},
} as unknown as SharedWorker;

if (typeof SharedWorker === 'function') {
  worker = new SharedWorker('/worker.js');
}

export const WorkerContext = React.createContext<{ worker: SharedWorker }>(
  null!,
);

export const WorkerProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <WorkerContext.Provider value={{ worker }}>
      {children}
    </WorkerContext.Provider>
  );
};
