import styled from 'styled-components';
import { colors } from '../Color';
import { TabButton } from './TabButton';

interface Tabs {
  idx: number;
  title: string;
}

interface TabBarProps {
  tabs: Tabs[];
  select: number;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export const TabBar = ({ tabs, select, onClick }: TabBarProps) => {
  return (
    <TabBarStyle>
      {tabs.map((item) => {
        return (
          <TabButton
            key={item.idx}
            active={select === item.idx}
            onClick={onClick}
            value={item.idx}
          >
            {item.title}
          </TabButton>
        );
      })}
    </TabBarStyle>
  );
};

const TabBarStyle = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
  height: 50px;

  background: ${colors.offWhite};
  box-shadow: inset 0px -1px 0px ${colors.gray3};
`;
