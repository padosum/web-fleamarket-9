import styled from 'styled-components';
import { colors } from '../Color';

export const ChatListItemSkeleton = () => {
  return (
    <SkeletonWrapper>
      <SkeletonLeft>
        <SkeletonLineElement></SkeletonLineElement>
        <SkeletonLongLineElement></SkeletonLongLineElement>
      </SkeletonLeft>
      <SkeletonRight>
        <SkeletonTimeStamp></SkeletonTimeStamp>
        <SkeletonImage></SkeletonImage>
      </SkeletonRight>
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
  height: 72px;
  padding: 16px;
  justify-content: space-between;
  align-items: center;
  background: ${colors.white};
  box-sizing: border-box;
`;

const SkeletonLeft = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  width: 100%;
`;

const SkeletonLineElement = styled(Gradient)`
  width: 30%;
  height: 13px;
`;

const SkeletonLongLineElement = styled(Gradient)`
  width: 70%;
  height: 16px;
`;

const SkeletonRight = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  width: 100%;
  align-items: flex-start;
  justify-content: flex-end;
`;

const SkeletonTimeStamp = styled(Gradient)`
  width: 30%;
  height: 10px;
  margin-right: 10px;
`;

const SkeletonImage = styled(Gradient)`
  width: 40px;
  height: 40px;
  border-radius: 6px;
`;
