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
  cursor: pointer;
`;

export const ToastMessage = ({
  text,
  id,
  setToasts,
  onClick,
}: {
  text: string;
  id: string;
  setToasts: Function;
  onClick?: Function;
}) => {
  const onClickMessage = () => {
    if (onClick) onClick();
  };

  useEffect(() => {
    setTimeout(() => {
      setToasts((toasts: JSX.Element[]) =>
        toasts.filter((toast) => toast.props.id !== id),
      );
    }, 2000);
  }, []);

  return (
    <ToastMessageWrapper onClick={onClickMessage} className="fade-in">
      {text}
    </ToastMessageWrapper>
  );
};
