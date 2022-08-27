import React from 'react';
import styled from 'styled-components';
import { colors } from './Color';
import { Icon } from './Icon';
import { TextInput } from './TextInput';

const ChatBarWrapper = styled.div`
  width: 100%;
  height: 52px;
  background-color: ${colors.offWhite};
  display: flex;
  align-items: center;
  padding: 0 16px 0 8px;
  box-sizing: border-box;
`;

const ButtonWrapper = styled.button`
  width: 20px;
  height: 20px;
  margin-left: 18px;
  display: block;
  cursor: pointer;

  svg {
    filter: invert(62%) sepia(51%) saturate(536%) hue-rotate(129deg)
      brightness(92%) contrast(99%);
  }

  &:disabled {
    svg {
      filter: invert(52%) sepia(11%) saturate(11%) hue-rotate(324deg)
        brightness(100%) contrast(93%);
    }
  }
`;

export const ChatBar = ({
  text,
  onTextChange,
  buttonActive,
  onButtonClick,
  onEnter,
}: {
  text?: string;
  onTextChange?: React.ChangeEventHandler<HTMLInputElement>;
  buttonActive?: boolean;
  onButtonClick?: React.MouseEventHandler;
  onEnter?: Function;
}) => {
  return (
    <ChatBarWrapper>
      <TextInput
        onKeyPress={(e) => {
          if (e.key === 'Enter' && onEnter) onEnter();
        }}
        value={text}
        onChange={onTextChange}
      />
      <ButtonWrapper disabled={!buttonActive} onClick={onButtonClick}>
        <Icon name="iconSend" width={20} height={20} />
      </ButtonWrapper>
    </ChatBarWrapper>
  );
};
