import styled from 'styled-components';
import { colors } from './Color';
import { Icon } from './Icon';

interface Props {
  disabled?: boolean;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const FabCommon = styled.button<Props>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: ${colors.primary};
  &:hover {
    background-color: ${colors.primary3};
  }
  &:focus {
    background-color: ${colors.primary};
    border: 2px solid ${colors.primary2};
  }
  &:disabled {
    cursor: not-allowed;
    background-color: ${colors.primary2};
  }
`;

export const Fab = ({ disabled, className, onClick }: Props) => {
  return (
    <FabCommon disabled={disabled} className={className} onClick={onClick}>
      <Icon name="iconAdd" color="white"></Icon>
    </FabCommon>
  );
};
