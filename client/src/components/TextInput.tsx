import styled from 'styled-components';
import { colors } from './Color';

const MediumInputContainer = styled.div<{
  height?: string | number;
  width?: string | number;
}>`
  width: ${(props) => (props.width ? `${props.width}px` : '100%')};
  height: ${(props) => (props.height ? `${props.height}px` : '36px')};
`;

const LargeInputContainer = styled.div<{
  height?: string | number;
  width?: string | number;
}>`
  width: ${(props) => (props.width ? `${props.width}px` : '100%')};
  height: ${(props) => (props.height ? `${props.height}px` : '40px')};
`;

const InputCommon = styled.input`
  width: 100%;
  height: inherit;
  border: 1px solid ${colors.gray3};
  border-radius: 8px;
  outline: none;
  box-sizing: border-box;
  color: ${colors.titleActive};
  &:focus {
    border-color: ${colors.primary1};
  }

  &::placeholder {
    color: ${colors.gray1};
  }
`;

const MediumInput = styled(InputCommon)`
  padding: 8px;
  font-size: 14px;
  line-height: 20px;
`;

const LargeInput = styled(InputCommon)`
  padding: 10px 16px 8px 16px;
  font-size: 16px;
  line-height: 22px;
`;

const NoBorderInput = styled.input`
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  color: ${colors.gray1};
  width: 100%;
  height: inherit;
  outline: none;
  box-sizing: border-box;
  color: ${colors.titleActive};
  border: none;

  &::placeholder {
    color: ${colors.gray1};
  }
`;

const TextArea = styled.textarea`
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  color: ${colors.gray1};
  width: 100%;
  height: inherit;
  outline: none;
  box-sizing: border-box;
  color: ${colors.titleActive};
  border: none;
  resize: none;

  &::placeholder {
    color: ${colors.gray1};
  }
`;

const IconInput = styled(InputCommon)`
  padding: 10px 16px 8px 36px;
  font-size: 16px;
  line-height: 22px;
`;

export const TextInput = (
  props: React.InputHTMLAttributes<HTMLInputElement>,
) => {
  return (
    <MediumInputContainer height={props.height} width={props.width}>
      <MediumInput type="text" {...props} />
    </MediumInputContainer>
  );
};

TextInput.Medium = TextInput;

TextInput.Large = (props: React.InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <LargeInputContainer height={props.height} width={props.width}>
      <LargeInput type="text" {...props} />
    </LargeInputContainer>
  );
};

TextInput.NoBorder = (props: React.InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <MediumInputContainer height={props.height} width={props.width}>
      <NoBorderInput type="text" {...props} />
    </MediumInputContainer>
  );
};

TextInput.TextArea = (
  props: React.InputHTMLAttributes<HTMLTextAreaElement>,
) => {
  return (
    <MediumInputContainer height={props.height} width={props.width}>
      <TextArea type="text" {...props} />
    </MediumInputContainer>
  );
};

TextInput.Icon = (props: React.InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <LargeInputContainer height={props.height} width={props.width}>
      <IconInput type="text" {...props} />
    </LargeInputContainer>
  );
};
