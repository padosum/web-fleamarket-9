import React from 'react';

const worker = new SharedWorker('/worker.js');
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
