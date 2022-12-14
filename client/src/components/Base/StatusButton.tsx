import { forwardRef } from 'react';
import styled from 'styled-components';
import { colors } from '../Color';
import { Dropdown } from '.';

interface Status {
  idx: number;
  name: string;
}

interface StatusButtonProps {
  status: Status[];
  select: number;
  open: boolean;
  children?: React.ReactNode;
  handleToggle?: React.MouseEventHandler<HTMLDivElement>;
  handleChange?: Function;
  ref?: React.MutableRefObject<HTMLDivElement>;
}

export const StatusButton = forwardRef((props: StatusButtonProps, ref) => {
  const currentName = props.status.filter(
    (item) => item.idx === props.select,
  )[0].name;

  return (
    <StatusButtonContainer>
      <StatusButtonStyle
        ref={ref}
        onMouseDown={props.handleToggle}
        open={props.open}
      >
        <StatusButtonTextStyle>{currentName}</StatusButtonTextStyle>
        <ArrowDownIcon />
      </StatusButtonStyle>
      {props.open && (
        <Dropdown
          items={props.status}
          select={props.select}
          handleChange={props.handleChange}
        />
      )}
    </StatusButtonContainer>
  );
});

const ArrowDownIcon = () => {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 8L12 16L20 8"
        stroke={colors.gray1}
        strokeWidth={'2px'}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const StatusButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;

  width: 150px;
  height: 40px;
`;

const StatusButtonTextStyle = styled.div`
  font-weight: 500;
  font-size: 15px;
  line-height: 20px;
  color: ${colors.titleActive};
`;

const StatusButtonStyle = styled.div<{
  open: boolean;
  handleToggle?: React.MouseEventHandler<HTMLDivElement>;
  ref?: any;
}>`
  display: flex;
  align-items: center;
  padding: 10px 16px;

  width: 100%;
  position: relative;
  cursor: pointer;

  background-color: ${colors.white};
  border-radius: 8px;
  border: 1px solid ${colors.gray5};

  color: ${colors.titleActive};

  & svg {
    position: absolute;
    right: 10px;
    ${({ open }) => (open ? `transform: rotate(180deg)` : '')}
  }
`;
