import React, { useContext } from 'react';

const worker = new SharedWorker('/worker.js');
const WorkerContext = React.createContext<{ worker: SharedWorker }>(null!);

export const WorkerProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <WorkerContext.Provider value={{ worker }}>
      {children}
    </WorkerContext.Provider>
  );
};

export const useWorker = () => {
  const context = useContext(WorkerContext);

  if (!context) throw 'error';

  return context.worker;
};
