import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ListItem } from '.';
import {
  CATEGORY_ID_QUERY_STRING,
  LOCATION_ID_QUERY_STRING,
} from '../../hooks/useHomeMenuOpenStates';

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
  const [searchParams] = useSearchParams();
  const lastCategory = useRef(searchParams.get(CATEGORY_ID_QUERY_STRING));
  const lastLocation = useRef(searchParams.get(LOCATION_ID_QUERY_STRING));
  const lastScrollTime = useRef(0);

  const onScroll = useCallback(() => {
    const currentTime = new Date().valueOf();

    if (currentTime - lastScrollTime.current < 100) return;

    lastScrollTime.current = currentTime;
    const [topUndiplayedCountTemp, bottomUndisplayedCountTemp] =
      getCurrentUndisplayedCount();

    const category = searchParams.get(CATEGORY_ID_QUERY_STRING);
    const location = searchParams.get(LOCATION_ID_QUERY_STRING);

    if (
      lastCategory.current !== category ||
      lastLocation.current !== location
    ) {
      setTopUndisplayedCount(0);
      setBottomUndisplayedCount(0);
      lastCategory.current = category;
      lastLocation.current = location;
    } else {
      setTopUndisplayedCount(topUndiplayedCountTemp);
      setBottomUndisplayedCount(bottomUndisplayedCountTemp);
    }
  }, [searchParams]);

  useEffect(() => {
    if (props.isFlatList) {
      window.addEventListener('scroll', onScroll);
    }

    return () => window.removeEventListener('scroll', onScroll);
  }, [props.isFlatList, onScroll]);

  /** 초기 렌더링 시 가상 스크롤 처리..  */
  useEffect(() => {
    onScroll();
  }, [props.items.length, onScroll]);

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
