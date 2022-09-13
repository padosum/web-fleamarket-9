import React from 'react';
import styled from 'styled-components';
import { colors } from '../Color';
import { Icon } from '.';
import { MediumImgBox, ImgBox } from '.';

export const ImgButton = ({
  text,
  onClick,
}: {
  text: string;
  onClick?: React.MouseEventHandler;
}) => {
  return (
    <CustomMediumImgBox onClick={onClick}>
      <Icon name="iconImage" />
      <ImgButtonText>{text}</ImgButtonText>
    </CustomMediumImgBox>
  );
};

ImgButton.Add = ImgButton;

ImgButton.Delete = ({
  src,
  onClick,
}: {
  src: string;
  onClick?: React.MouseEventHandler;
}) => {
  return (
    <DeleteImgButtonWrapper>
      <ImgBox.Medium src={src} />
      <CloseButtonWrapper onClick={onClick}>
        <Icon name="iconClose" />
      </CloseButtonWrapper>
    </DeleteImgButtonWrapper>
  );
};

const CustomMediumImgBox = styled(MediumImgBox)`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  position: relative;

  svg {
    filter: invert(53%) sepia(22%) saturate(0%) hue-rotate(185deg)
      brightness(97%) contrast(90%);
  }
`;

const ImgButtonText = styled.span`
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: ${colors.gray1};
  margin-top: 7px;
`;

const DeleteImgButtonWrapper = styled.div`
  width: max-content;
  position: relative;
`;

const CloseButtonWrapper = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  width: 24px;
  height: 24px;
  border-radius: 50%;
  position: absolute;
  right: -5px;
  top: -5px;
  background-color: ${colors.titleActive};

  svg {
    filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(102deg)
      brightness(104%) contrast(101%);
  }
`;
