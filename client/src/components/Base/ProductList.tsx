import React, { useEffect, useRef, useState } from 'react';
import { ListItem } from '.';

interface Item {
  idx: number;
  title: string;
  location: string;
  timestamp: string;
  price: number;
  messageCnt: number;
  likeCnt: number;
  image: string;
  thumbnail: string;
  isLiked: boolean;
}

interface ProductListProps {
  items: Item[];
  type: string;
  getItems?: Function;
  isFlatList?: boolean;
}
const UNIT_HEIGHT = 140;
const HEIGHT_MARGIN = 1500;

export const ProductList = (props: ProductListProps) => {
  const [topUndiplayedCount, setTopUndisplayedCount] = useState(0);
  const [bottomUndisplayedCount, setBottomUndisplayedCount] = useState(0);

  const lastScrollTime = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const currentTime = new Date().valueOf();

      if (currentTime - lastScrollTime.current < 100) return;

      lastScrollTime.current = currentTime;
      const [topUndiplayedCountTemp, bottomUndisplayedCountTemp] =
        getCurrentUndisplayedCount();
      setTopUndisplayedCount(topUndiplayedCountTemp);
      setBottomUndisplayedCount(bottomUndisplayedCountTemp);
    };

    if (props.isFlatList) {
      window.addEventListener('scroll', onScroll);
    }

    return () => window.removeEventListener('scroll', onScroll);
  }, [props.isFlatList]);

  useEffect(() => {
    const [topUndiplayedCountTemp, bottomUndisplayedCountTemp] =
      getCurrentUndisplayedCount();
    setTopUndisplayedCount(topUndiplayedCountTemp);
    setBottomUndisplayedCount(bottomUndisplayedCountTemp);
  }, [props.items.length]);

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
          if (
            index < topUndiplayedCount ||
            index > props.items.length - bottomUndisplayedCount
          ) {
            return <React.Fragment key={item.idx} />;
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

const getCurrentUndisplayedCount = () => {
  const screenHeight = window.innerHeight + HEIGHT_MARGIN;
  const totalHeight = document.documentElement.scrollHeight;
  const scrollY = Math.max(window.scrollY - HEIGHT_MARGIN / 2, 0);
  const scrollBottomY = Math.max(
    0,
    totalHeight - (scrollY + screenHeight) - HEIGHT_MARGIN / 2,
  );

  const topUndiplayedCountTemp = Math.floor(scrollY / UNIT_HEIGHT);
  const bottomUndisplayedCountTemp = Math.floor(scrollBottomY / UNIT_HEIGHT);

  return [topUndiplayedCountTemp, bottomUndisplayedCountTemp];
};
