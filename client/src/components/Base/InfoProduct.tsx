import React from 'react';
import styled from 'styled-components';
import { colors } from '../Color';
import { ImgBox } from '.';

export const InfoProduct = ({
  src,
  title,
  price,
  buttonText,
  onButtonClick,
}: {
  src: string;
  title: string;
  price: string;
  buttonText: string;
  onButtonClick: React.MouseEventHandler;
}) => {
  return (
    <InfoProductWrapper>
      <ImgBox.Small src={src} />
      <TextWrap>
        <BoldText>{title}</BoldText>
        <GrayText>{price}</GrayText>
      </TextWrap>
      <Button onClick={onButtonClick}>{buttonText}</Button>
    </InfoProductWrapper>
  );
};

const InfoProductWrapper = styled.div`
  width: 100%;
  height: 72px;
  display: flex;
  align-items: center;
  padding: 16px;
  box-sizing: border-box;
`;

const TextWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 8px;
  margin-right: auto;
`;

const BoldText = styled.span`
  font-size: 14px;
  color: ${colors.titleActive};
`;

const GrayText = styled.span`
  font-size: 12px;
  color: ${colors.gray4};
`;

const Button = styled.button`
  height: 40px;
  color: ${colors.titleActive};
  font-size: 14px;
  padding: 10px 16px;
  border-radius: 8px;
  border: 1px solid ${colors.gray5};
  flex-shrink: 0;
`;
