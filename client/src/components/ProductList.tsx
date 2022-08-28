import { useEffect, useState } from 'react';
import { ListItem } from './ListItem';

interface Item {
  idx: number;
  title: string;
  location: string;
  timestamp: string;
  price: number;
  messageCnt: number;
  likeCnt: number;
  image: string;
  isLiked: boolean;
}

interface Props {
  items: Item[];
  type: string;
  getItems?: Function;
  isFlatList?: boolean;
}

const UNIT_HEIGHT = 140;

export const ProductList = (props: Props) => {
  const [topUndiplayedCount, setTopUndisplayedCount] = useState(0);
  const [bottomUndisplayedCount, setBottomUndisplayedCount] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const screenHeight = window.innerHeight + 1500;
      const totalHeight = document.documentElement.scrollHeight;
      const scrollY = Math.max(window.scrollY - 750, 0);
      const scrollBottomY = Math.max(
        0,
        totalHeight - (scrollY + screenHeight) - 750,
      );

      const topUndiplayedCount = Math.floor(scrollY / UNIT_HEIGHT);
      const bottomUndisplayedCount = Math.floor(scrollBottomY / UNIT_HEIGHT);

      setTopUndisplayedCount(topUndiplayedCount);
      setBottomUndisplayedCount(bottomUndisplayedCount);
    };

    if (props.isFlatList) {
      window.addEventListener('scroll', onScroll);
    }

    return () => window.removeEventListener('scroll', onScroll);
  }, [props.isFlatList]);

  return (
    <div
      style={
        props.isFlatList
          ? {
              paddingBottom: bottomUndisplayedCount * UNIT_HEIGHT,
              paddingTop: topUndiplayedCount * UNIT_HEIGHT,
            }
          : {}
      }
    >
      {props.isFlatList &&
        props.items.map((item, index) => {
          if (index < topUndiplayedCount) {
            return <></>;
          } else if (index > props.items.length - bottomUndisplayedCount) {
            return <></>;
          } else {
            return (
              <ListItem
                isLastItem={index === props.items.length - 1}
                getItems={props.getItems}
                key={item.idx}
                {...item}
                type={props.type}
              />
            );
          }
        })}

      {!props.isFlatList &&
        props.items.map((item, index) => {
          return (
            <ListItem
              isLastItem={index === props.items.length - 1}
              getItems={props.getItems}
              key={item.idx}
              {...item}
              type={props.type}
            />
          );
        })}
    </div>
  );
};
