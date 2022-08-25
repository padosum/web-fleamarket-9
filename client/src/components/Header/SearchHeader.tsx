import styled from 'styled-components';
import { colors } from '../Color';
import { Icon } from '../Icon';
import { TextInput } from '../TextInput';
import { HeaderWrapper } from './HeaderWrapper';

interface Props {
  title?: string;
  color: keyof typeof colors;
  onClickBack: React.MouseEventHandler<HTMLDivElement>;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
}

const LeftWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;
  user-select: none;
`;

const CenterWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${colors.titleActive};
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  flex-grow: 1;
`;

const InputIconWrapper = styled.div`
  position: absolute;
  left: 50px;
`;

export const SearchHeader = ({
  title,
  color,
  onClickBack,
  onChange,
  placeholder,
}: Props) => {
  return (
    <HeaderWrapper color={color}>
      <LeftWrapper onClick={onClickBack}>
        <Icon name="iconLeft" width={24} height={24} color="titleActive"></Icon>
      </LeftWrapper>
      <CenterWrapper>
        <InputIconWrapper>
          <Icon name="iconSearch"></Icon>
        </InputIconWrapper>
        <TextInput.Icon
          onChange={onChange}
          placeholder={placeholder}
        ></TextInput.Icon>
      </CenterWrapper>
    </HeaderWrapper>
  );
};
