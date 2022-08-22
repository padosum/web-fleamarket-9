import styled from 'styled-components';

const IconWrapper = styled.div<{ width?: number; height?: number }>`
  width: ${(props) => (props.width ? `${props.width}px` : '30px')};
  height: ${(props) => (props.height ? `${props.height}px` : '30px')};
`;

const Img = styled.img<{ width?: number; height?: number }>`
  width: ${(props) => (props.width ? `${props.width}px` : '30px')};
  height: ${(props) => (props.height ? `${props.height}px` : '30px')};
`;

export const Icon = ({
  src,
  width,
  height,
}: {
  src: string;
  width?: number;
  height?: number;
}) => {
  return (
    <IconWrapper width={width} height={height}>
      <Img src={src} alt="icon" width={width} height={height} />
    </IconWrapper>
  );
};

Icon.Category = () => {
  return (
    <IconWrapper>
      <Img />
    </IconWrapper>
  );
};

Icon.Menu = () => {
  return (
    <IconWrapper>
      <Img />
    </IconWrapper>
  );
};

Icon.Profile = () => {
  return (
    <IconWrapper>
      <Img />
    </IconWrapper>
  );
};

Icon.Location = () => {
  return (
    <IconWrapper>
      <Img />
    </IconWrapper>
  );
};

Icon.LeftArrow = () => {
  return (
    <IconWrapper>
      <Img />
    </IconWrapper>
  );
};

Icon.RightArrow = () => {
  return (
    <IconWrapper>
      <Img />
    </IconWrapper>
  );
};

Icon.DownArrow = () => {
  return (
    <IconWrapper>
      <Img />
    </IconWrapper>
  );
};

Icon.Close = () => {
  return (
    <IconWrapper>
      <Img />
    </IconWrapper>
  );
};

Icon.Add = () => {
  return (
    <IconWrapper>
      <Img />
    </IconWrapper>
  );
};

Icon.Check = () => {
  return (
    <IconWrapper>
      <Img />
    </IconWrapper>
  );
};

Icon.More = () => {
  return (
    <IconWrapper>
      <Img />
    </IconWrapper>
  );
};

Icon.Exit = () => {
  return (
    <IconWrapper>
      <Img />
    </IconWrapper>
  );
};

Icon.Picture = () => {
  return (
    <IconWrapper>
      <Img />
    </IconWrapper>
  );
};

Icon.Send = () => {
  return (
    <IconWrapper>
      <Img />
    </IconWrapper>
  );
};

Icon.Chat = () => {
  return (
    <IconWrapper>
      <Img />
    </IconWrapper>
  );
};

Icon.Like = () => {
  return (
    <IconWrapper>
      <Img />
    </IconWrapper>
  );
};
