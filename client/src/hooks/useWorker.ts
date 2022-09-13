import { useContext } from 'react';
import { WorkerContext } from '../context/WorkerContext';

export const useWorker = () => {
  const context = useContext(WorkerContext);

  if (!context) throw new Error('error');

  return context.worker;
};
