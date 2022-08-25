import { useState } from 'react';
import styled from 'styled-components';
import { colors } from './Color';
import { Icon } from './Icon';
import { ImgBox } from './ImgBox';
import * as icons from './iconPath';
import { Dropdown } from './Dropdown';
import moment from 'moment';
import { comma } from '../utils/util';

interface Props {
  title: string;
  location: string;
  timestamp: string;
  price: number;
  messageCnt: number;
  likeCnt: number;
  type: string;
  image: string;
}

interface DropdownItem {
  idx: number;
  name: string;
  color?: keyof typeof colors;
}

const dropdownItems: DropdownItem[] = [
  { idx: 1, name: '수정하기' },
  { idx: 99999, name: '삭제하기', color: 'red' },
];

export const ListItem = ({
  title,
  location,
  timestamp,
  price,
  messageCnt,
  likeCnt,
  type,
  image,
}: Props) => {
  const [like, setLike] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  const handleClickAction = (e: React.MouseEvent<HTMLDivElement>) => {
    if (type === 'shopping') {
      setLike((prevLike) => !prevLike);
      return;
    }

    if (type === 'sales') {
      setOpenMenu((prevOpenMenu) => !prevOpenMenu);
      return;
    }
  };

  interface IconProps {
    name: keyof typeof icons;
    color: keyof typeof colors;
    width: number;
    height: number;
    clickable: boolean;
  }
  const iconProps: IconProps = {
    name: 'iconHeart',
    color: like ? 'primary' : 'gray1',
    width: 24,
    height: 24,
    clickable: true,
  };

  return (
    <ItemWrapper>
      <ImgWrapper>
        <ImgBox.Large src={image} />
      </ImgWrapper>
      <ItemDescription>
        <ItemTitleText>{title}</ItemTitleText>
        <LocationTimestampStyle>
          {location}·{moment(timestamp).format('YYYY-MM-DD')}
        </LocationTimestampStyle>
        <PriceStyle>{comma(price + '')}원</PriceStyle>
      </ItemDescription>
      <ButtonWrapper onClick={handleClickAction}>
        {type === 'sales' ? (
          <Icon
            name="iconMore"
            color={'gray1'}
            width={24}
            height={24}
            strokeWidth={2}
            clickable={true}
          ></Icon>
        ) : (
          <Icon {...iconProps} {...(like ? { fill: 'primary' } : {})} />
        )}
        <StatisticsWrapper>
          {messageCnt > 0 && <Icon name="iconMessage" color="gray1"></Icon>}
          {messageCnt > 0 && <CountWrapper>{messageCnt}</CountWrapper>}
          <Spacing></Spacing>
          {likeCnt > 0 && <Icon name="iconHeart" color="gray1"></Icon>}
          {likeCnt > 0 && <CountWrapper>{likeCnt}</CountWrapper>}
        </StatisticsWrapper>
        {openMenu && (
          <Dropdown
            width="100"
            top="20"
            left="-90"
            items={dropdownItems}
            select={0}
            handleChange={() => {}}
          ></Dropdown>
        )}
      </ButtonWrapper>
    </ItemWrapper>
  );
};

const ItemWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 139px;
  justify-content: flex-start;
  align-items: center;
  background: ${colors.white};
  border-bottom: 1px solid ${colors.gray3};
`;

const ImgWrapper = styled.div`
  flex-shrink: 0;
`;
const ItemDescription = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  position: relative;
  height: 106px;
  padding: 0 10px;

  flex-grow: 1;

  min-width: 0;
`;

const ItemTitleText = styled.h1`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 16px;
  font-weight: 700;
  line-height: 22px;
  margin: 0;
`;

const LocationTimestampStyle = styled.div`
  font-size: 14px;
  color: ${colors.gray1};
`;

const PriceStyle = styled.div``;

const StatisticsWrapper = styled.div`
  display: flex;
  align-items: center;

  position: absolute;
  right: 5px;
  bottom: 0;

  font-size: 14px;
  line-height: 14px;
  font-weight: 400;
  color: ${colors.gray1};
`;

const ButtonWrapper = styled.div`
  display: flex;
  height: 106px;

  position: relative;
`;

const CountWrapper = styled.span`
  margin-left: 5px;
`;

const Spacing = styled.span`
  width: 10px;
`;
