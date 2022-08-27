import { useState } from 'react';
import styled from 'styled-components';
import { ToastMessage } from './ToastMessage';

const ToastMessageContainerWrapper = styled.div`
  position: fixed;
  right: 0px;
  top: 15px;
  z-index: 999;
`;

export let toast: Function = (message: string) => {};

export const ToastMessageContainer = () => {
  const [toasts, setToasts] = useState<JSX.Element[]>([]);

  const addToast = (message: string) => {
    const random = `${Math.random()}`;
    const toast = (
      <ToastMessage text={message} id={random} setToasts={setToasts} />
    );
    setToasts((toasts) => [...toasts, toast]);
  };

  toast = addToast;

  return <ToastMessageContainerWrapper>{toasts}</ToastMessageContainerWrapper>;
};
