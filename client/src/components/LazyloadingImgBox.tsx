import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { colors } from './Color';

type Timer = ReturnType<typeof setTimeout>;

export const LazyloadingImgBox = (
  props: React.ImgHTMLAttributes<HTMLImageElement>,
) => {
  const [isLoad, setIsLoad] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    let timeouts: Timer;
    const observer = new IntersectionObserver(
      (e) => {
        if (e[0].isIntersecting) {
          timeouts = setTimeout(() => {
            observer.unobserve(imgRef.current);
            setIsLoad(true);
          }, 1000);
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

  const { src, ...restProps } = props;
  return (
    <LargeImgBox ref={imgRef}>
      {props.src && (
        <Img {...restProps} {...(isLoad ? { src: props.src } : {})} />
      )}
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
