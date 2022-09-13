import styled from 'styled-components';
import { colors } from '../Color';
import { Icon } from '.';

interface LocationButtonProps {
  title?: string;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const LocationButton = (props: LocationButtonProps) => {
  const { title } = props;
  return (
    <LocationButtonCommon {...props}>
      {title ? (
        <>
          <LocationButtonTitle>{title}</LocationButtonTitle>
          <Icon name="iconClose" color="primary2" width={24} height={24}></Icon>
        </>
      ) : (
        <Icon name="iconAdd" color="primary2" width={24} height={24}></Icon>
      )}
    </LocationButtonCommon>
  );
};

const LocationButtonCommon = styled.button<LocationButtonProps>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 6px 16px;
  gap: 2px;
  width: 136px;
  height: 36px;
  border: 1px solid ${colors.primary};
  border-radius: 8px;
  background-color: ${colors.white};
  ${({ title }) => (title ? `color: ${colors.white};` : '')}
  ${({ title }) => (title ? `background-color: ${colors.primary};` : '')}

  &:active {
    background-color: ${({ title }) => (title ? colors.white : colors.primary)};
    ${({ title }) => (title ? `color: ${colors.primary3};` : '')};
  }
`;

const LocationButtonTitle = styled.div`
  width: 78px;
  height: 24px;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;

  display: flex;
  align-items: center;
`;
