import styled from 'styled-components';
import { colors } from './Color';

interface Item {
  idx: number;
  name: string;
}

interface Props {
  items: Item[];
  select: number;
  handleChange?: React.MouseEventHandler<HTMLDivElement>;
}

export const Dropdown = (props: Props) => {
  return (
    <DropdownWrapper>
      {props.items.map((item) => {
        if (item.idx !== props.select) {
          return (
            <DropdownItemStyle
              key={item.idx}
              data-idx={item.idx}
              onMouseDown={props.handleChange}
            >
              {item.name}
            </DropdownItemStyle>
          );
        }
        return null;
      })}
    </DropdownWrapper>
  );
};

const DropdownWrapper = styled.div`
  position: absolute;
  top: 120%;
  width: 100%;
  z-index: 100;

  background: ${colors.gray3};
  border: 1px solid ${colors.gray3};
  box-shadow: 0px 0px 4px rgba(204, 204, 204, 0.5),
    0px 2px 4px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(4px);
  border-radius: 10px;
  overflow: hidden;
`;

const DropdownItemStyle = styled.div`
  cursor: pointer;
  padding: 16px;
  background: ${colors.offWhite};

  &:not(last-child) {
    border-bottom: 1px solid ${colors.gray3};
  }
`;
