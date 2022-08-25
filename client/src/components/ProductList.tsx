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
}

interface Props {
  items: Item[];
  type: string;
}

export const ProductList = (props: Props) => {
  return (
    <>
      {props.items.map((item) => {
        return <ListItem key={item.idx} {...item} type={props.type} />;
      })}
    </>
  );
};
