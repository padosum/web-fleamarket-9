import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { colors } from './Color';

type Timer = ReturnType<typeof setTimeout>;

const isLoaded = new Map();

export const LazyloadingImgBox = ({ src }: { src: string }) => {
  const prevLoaded = isLoaded.has(src);
  const [isLoad, setIsLoad] = useState(prevLoaded);
  const imgRef = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    let timeouts: Timer;
    const observer = new IntersectionObserver(
      (e) => {
        if (e[0].isIntersecting && !isLoad) {
          timeouts = setTimeout(() => {
            setIsLoad(true);
            isLoaded.set(src, true);
            observer.unobserve(imgRef.current);
          }, 200);
        } else {
          clearTimeout(timeouts);
        }
      },
      {
        rootMargin: '0px',
        threshold: 0.3,
      },
    );

    observer.observe(imgRef.current);
  }, []);

  return (
    <LargeImgBox ref={imgRef}>
      {src && <Img {...(isLoad ? { src } : {})} />}
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
