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
}

export const ProductList = (props: Props) => {
  return (
    <>
      {props.items.map((item, index) => {
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
    </>
  );
};
