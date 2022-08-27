import { useEffect } from 'react';
import styled from 'styled-components';

const ToastMessageWrapper = styled.div`
  width: 300px;
  border-radius: 20px;
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  text-align: center;
  padding: 10px;
  margin-bottom: 10px;
`;

export const ToastMessage = ({
  text,
  id,
  setToasts,
}: {
  text: string;
  id: string;
  setToasts: Function;
}) => {
  useEffect(() => {
    setTimeout(() => {
      setToasts((toasts: JSX.Element[]) =>
        toasts.filter((toast) => toast.props.id !== id),
      );
    }, 2000);
  }, []);

  return <ToastMessageWrapper className="fade-in">{text}</ToastMessageWrapper>;
};
