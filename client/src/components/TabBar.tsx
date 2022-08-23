import styled from 'styled-components';
import { colors } from './Color';
import { TabButton } from './TabButton';

interface Tabs {
  idx: number;
  title: string;
}

interface Props {
  tabs: Tabs[];
  select: number;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const TabBarStyle = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
  padding: 0px 16px 0px;
  height: 50px;

  background: ${colors.offWhite};
  box-shadow: inset 0px -1px 0px ${colors.gray3};
`;

export const TabBar = ({ tabs, select, onClick }: Props) => {
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
