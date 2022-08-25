import React, { useContext } from 'react';
import styled from 'styled-components';
import { FormContext } from '../../context/FormContext';
import { colors } from '../Color';

const ErrorMessage = ({ name }: { name: string }) => {
  const { touched, errors }: any = useContext(FormContext);
  if (!touched[name] || !errors[name]) {
    return null;
  }
  return <SpanStyle>{errors[name]}</SpanStyle>;
};

const SpanStyle = styled.span`
  color: ${colors.red};
  font-size: 12px;
`;
export default ErrorMessage;
