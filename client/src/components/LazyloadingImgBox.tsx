import React, { Dispatch, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { colors } from './Color';

type Timer = ReturnType<typeof setTimeout>;

export const LazyloadingImgBox = ({
  src,
  loadImages,
  setLoadImages,
}: {
  src: string;
  loadImages: string[];
  setLoadImages: Dispatch<React.SetStateAction<string[]>>;
}) => {
  const prevLoaded = loadImages ? loadImages.some((v) => v === src) : false;
  const [isLoad, setIsLoad] = useState(
    loadImages?.length === 0 ? false : prevLoaded,
  );
  const imgRef = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    let timeouts: Timer;
    const observer = new IntersectionObserver(
      (e) => {
        if (e[0].isIntersecting && !isLoad) {
          timeouts = setTimeout(() => {
            setIsLoad(true);
            setLoadImages((prevSetLoadImages) => [...prevSetLoadImages, src]);
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
