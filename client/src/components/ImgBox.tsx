import styled, { css } from 'styled-components';
import { colors } from './Color';

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

const SmallImgBox = styled(ImgBoxCommon)`
  width: 40px;
  height: 40px;
  border-radius: 6px;
`;

export const MediumImgBox = styled(ImgBoxCommon)`
  width: 76px;
  min-width: 76px;
  height: 76px;
  border-radius: 8px;
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

const Gradient = styled.div<{
  width?: number | string;
  height?: number | string;
  src?: string;
}>`
  ${(props) =>
    props.src &&
    css`
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      background-image: url(${props.src}),
        linear-gradient(
          180deg,
          rgba(0, 0, 0, 0.24) 0%,
          rgba(0, 0, 0, 0) 16.52%,
          rgba(0, 0, 0, 0) 87.36%,
          rgba(0, 0, 0, 0.24) 100%
        );
      background-blend-mode: color;
    `}

  ${(props) => (props.width ? `width: ${props.width}px;` : 'width: 100%;')}
  ${(props) => (props.height ? `height: ${props.height}px;` : 'height: 100%;')}
`;

export const ImgBox = (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
  return <SmallImgBox>{props.src && <Img {...props} />}</SmallImgBox>;
};

ImgBox.Small = ImgBox;

ImgBox.Medium = (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
  return <MediumImgBox>{props.src && <Img {...props} />}</MediumImgBox>;
};

ImgBox.Large = (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
  return <LargeImgBox>{props.src && <Img {...props} />}</LargeImgBox>;
};

ImgBox.Gradient = (props: {
  width?: number;
  height?: number;
  src?: string;
}) => {
  return <Gradient {...props} />;
};
