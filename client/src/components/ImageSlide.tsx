import React from 'react';
import { Pagination } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import styled from 'styled-components';
import { ImgBox } from './ImgBox';

export const ImageSlide = ({ images }: { images: string }) => {
  if (!images) {
    return null;
  }

  const imageSrc = images.split(',');
  return (
    <SwiperStyle
      spaceBetween={30}
      pagination={{
        clickable: true,
      }}
      modules={[Pagination]}
      className="mySwiper"
    >
      {imageSrc.map((image, idx) => {
        return (
          <SwiperSlide key={`${image}-${idx}`}>
            <ImgBox.Gradient height={320} src={image}></ImgBox.Gradient>
          </SwiperSlide>
        );
      })}
    </SwiperStyle>
  );
};

const SwiperStyle = styled(Swiper)`
  height: 320px;
`;
