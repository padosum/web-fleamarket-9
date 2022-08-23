import styled from 'styled-components';
import { colors } from './Color';

const NavIcon = styled.button<{ active?: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: 1px solid ${colors.white};
  cursor: pointer;
  ${(props) => (props.active ? `background-color: ${colors.white};` : '')}
  margin-right: 8px;
  &:last-child {
    margin-right: 0;
  }
`;

const ImgNav = ({
  active,
  onClick,
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { active?: boolean }) => {
  return <NavIcon onClick={onClick} active={active} />;
};

const NavWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 48px;
`;

export const ImgNavigation = ({
  totalCount,
  index,
  onClick,
}: {
  totalCount: number;
  index: number;
  onClick: (newIdx: number) => void;
}) => {
  return (
    <NavWrapper>
      {new Array(totalCount).fill(null).map((item, idx) => {
        return (
          <ImgNav
            onClick={onClick.bind(null, idx)}
            key={idx}
            active={index === idx}
          />
        );
      })}
    </NavWrapper>
  );
};
