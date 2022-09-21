import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { colors } from '../Color';

const LAZY_LOAD_TIME_INTERVAL = 200;
const loadedImages = new Map();

export const LazyloadingImgBox = ({ src }: { src: string }) => {
  const [isloaded, setIsLoaded] = useState(loadedImages.has(src));

  useEffect(() => {
    const timer = setTimeout(() => {
      const img = new Image();
      img.onload = () => {
        setIsLoaded(true);
        loadedImages.set(src, true);
      };
      img.src = src;
    }, LAZY_LOAD_TIME_INTERVAL);

    return () => clearTimeout(timer);
  }, [src]);

  return (
    <LargeImgBox
      data-cy="loaded-count"
      data-total-loaded-count={loadedImages.size}
    >
      {src && <Img data-cy="lazy-img" {...(isloaded ? { src } : {})} />}
    </LargeImgBox>
  );
};

const ImgBoxCommon = styled.div`
  border: 1px solid ${colors.gray3};
  background-color: ${colors.offWhite};
  overflow: hidden;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const LargeImgBox = styled(ImgBoxCommon)`
  width: 106px;
  height: 106px;
  border-radius: 10px;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
`;
