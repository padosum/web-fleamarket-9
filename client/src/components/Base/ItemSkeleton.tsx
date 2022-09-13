import styled from 'styled-components';
import { Spacing } from './Spacing';

export const ItemSkeleton = () => {
  return (
    <ItemSkeletonWrapper>
      <ImgElement />
      <TextWrap>
        <TextElement width={200} height={20} />
        <Spacing height={5} />
        <TextElement width={250} height={20} />
        <Spacing height={5} />
        <TextElement width={80} height={20} />
      </TextWrap>
    </ItemSkeletonWrapper>
  );
};

const ItemSkeletonWrapper = styled.div`
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  height: 140px;
  background-color: #ffffff;
  display: flex;
  align-items: center;
`;

const Gradient = styled.div`
  animation-duration: 1.8s;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-name: placeHolderShimmer;
  animation-timing-function: linear;
  background: #fafafa;
  background: linear-gradient(
    to right,
    #fafafa 15%,
    #cdcdcd 20%,
    #fafafa 30%,
    #fafafa 15%
  );
  background-size: 1000px 640px;

  position: relative;

  @keyframes placeHolderShimmer {
    0% {
      background-position: -468px 0;
    }
    100% {
      background-position: 468px 0;
    }
  }
`;

const ImgElement = styled(Gradient)`
  width: 106px;
  height: 106px;
  border-radius: 10px;
`;

const TextWrap = styled.div`
  margin-left: 10px;
`;

const TextElement = styled(Gradient)<{ width: number; height: number }>`
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  border-radius: 4px;
`;
