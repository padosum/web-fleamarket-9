import { useContext } from 'react';
import styled from 'styled-components';
import { FormContext } from '../../context/FormContext';
import { colors } from '../Color';
import { TextInput } from '../Base';

const Field = (props: any) => {
  const { getFieldProps, errors, touched }: any = useContext(FormContext);
  return (
    <TextInputWrapper
      invalid={touched[props.name] && errors[props.name] !== ''}
    >
      <TextInput {...props} {...getFieldProps(props.name)} />
    </TextInputWrapper>
  );
};

const TextInputWrapper = styled.div<{ invalid: boolean }>`
  input {
    ${({ invalid }) => (invalid ? `border-color: ${colors.red};` : '')}
  }
`;
export default Field;
