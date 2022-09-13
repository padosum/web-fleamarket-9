import { useState } from 'react';
import styled from 'styled-components';
import { ToastMessage } from '.';

export let toast: Function = (message: string, onClick?: Function) => {};

export const ToastMessageContainer = () => {
  const [toasts, setToasts] = useState<JSX.Element[]>([]);

  const addToast = (message: string, onClick?: Function) => {
    const random = `${Math.random()}`;
    const toast = (
      <ToastMessage
        key={random}
        text={message}
        id={random}
        setToasts={setToasts}
        onClick={onClick}
      />
    );
    setToasts((toasts) => [...toasts, toast]);
  };

  toast = addToast;

  return <ToastMessageContainerWrapper>{toasts}</ToastMessageContainerWrapper>;
};

const ToastMessageContainerWrapper = styled.div`
  position: fixed;
  right: 0px;
  top: 15px;
  z-index: 999;
`;
