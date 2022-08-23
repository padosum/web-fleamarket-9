import styled from 'styled-components';
import { colors } from './Color';
import { Icon } from './Icon';

const ProductBarWrapper = styled.div`
  height: 60px;
  background-color: ${colors.white};
  width: 100%;
  display: flex;
  align-items: center;
  padding-left: 18px;
`;

const VerticalBar = styled.div`
  height: 36px;
  width: 1px;
  background-color: ${colors.gray3};
  margin: 0 16px;
`;

const PriceText = styled.span`
  color: ${colors.titleActive};
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
`;

const ButtonWrapper = styled.div`
  margin-left: auto;
  margin-right: 16px;
`;

const LikeButtonWrapper = styled.button<{ isLiked?: boolean }>`
  cursor: pointer;

  svg {
    ${({ isLiked }) => (isLiked ? `fill: ${colors.titleActive};` : '')}
  }
`;

export const ProductBar = ({
  isLiked,
  onLikeClick,
  price,
  Button,
}: {
  isLiked?: boolean;
  onLikeClick?: React.MouseEventHandler;
  price: string;
  Button: React.ReactNode;
}) => {
  return (
    <ProductBarWrapper>
      <LikeButtonWrapper onClick={onLikeClick} isLiked={isLiked}>
        <Icon name="iconHeart" width={21} height={17} />
      </LikeButtonWrapper>
      <VerticalBar />
      <PriceText>{price}</PriceText>
      <ButtonWrapper>{Button}</ButtonWrapper>
    </ProductBarWrapper>
  );
};
