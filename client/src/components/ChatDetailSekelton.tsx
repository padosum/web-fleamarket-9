import styled from 'styled-components';
import { colors } from './Color';
import { Spacing } from './Spacing';

export const ChatDetailSkeleton = () => {
  return (
    <SkeletonWrapper>
      <SkeletonHeader>
        <SekeletonReciever></SekeletonReciever>
      </SkeletonHeader>
      <SekeletonBox>
        <SkeletonImage></SkeletonImage>
        <SkeletonTextWrap>
          <SkeletonLongLineElement></SkeletonLongLineElement>
          <SkeletonLineElement></SkeletonLineElement>
        </SkeletonTextWrap>
        <SkeletonButton></SkeletonButton>
      </SekeletonBox>
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

const SkeletonHeader = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  min-height: 56px;

  position: sticky;
  top: 0;
  left: 0;
  right: 0;

  padding: 0 16px;
  box-sizing: border-box;
`;

const SekeletonReciever = styled(Gradient)`
  width: 30%;
  height: 20px;
`;

const SekeletonBox = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
`;

const SkeletonTextWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 8px;
  margin-right: auto;
  width: 100%;
  height: 100%;
  justify-content: space-between;
`;

const SkeletonImage = styled(Gradient)`
  width: 40px;
  height: 40px;
  border-radius: 6px;
  flex-shrink: 0;
`;

const SkeletonLineElement = styled(Gradient)`
  width: 30%;
  height: 10px;
`;

const SkeletonLongLineElement = styled(Gradient)`
  width: 70%;
  height: 20px;
`;

const SkeletonButton = styled(Gradient)`
  width: 50px;
  height: 40px;
  flex-shrink: 0;
  border-radius: 6px;
`;
