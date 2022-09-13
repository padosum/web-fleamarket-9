import styled from 'styled-components';
import { colors } from '../Color';
import { Spacing } from '.';

export const ItemDetailSkeleton = () => {
  return (
    <SkeletonWrapper>
      <SkeletonImage></SkeletonImage>
      <Spacing height={10}></Spacing>
      <SkeletonTitle></SkeletonTitle>
      <Spacing height={10}></Spacing>
      <SkeletonCategory></SkeletonCategory>
      <Spacing height={10}></Spacing>
      <SkeletonContents></SkeletonContents>
    </SkeletonWrapper>
  );
};

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

const SkeletonWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  padding: 16px;
  justify-content: space-between;
  align-items: flex-start;
  background: ${colors.white};
  box-sizing: border-box;
  flex-direction: column;
`;

const SkeletonImage = styled(Gradient)`
  width: 100%;
  height: 320px;
`;

const SkeletonTitle = styled(Gradient)`
  width: 60%;
  height: 30px;
`;

const SkeletonCategory = styled(Gradient)`
  width: 30%;
  height: 10px;
`;

const SkeletonContents = styled(Gradient)`
  width: 100%;
  height: 150px;
`;
