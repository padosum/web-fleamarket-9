import React, { createContext } from 'react';
import useForm from '../hooks/useForm';

export const FormContext = createContext({});
FormContext.displayName = 'FormContext';

interface FormInputValue {
  [key: string]: string;
}

interface FormContextValue {
  initialValues: FormInputValue;
  validate: (value: FormInputValue) => FormInputValue;
  onSubmit: any;
  children: React.ReactNode;
}

const Form = ({ children, ...props }: FormContextValue) => {
  const formValue = useForm(props);
  return (
    <FormContext.Provider value={formValue}>
      <form onSubmit={formValue.handleSubmit}>{children}</form>
    </FormContext.Provider>
  );
};

export default Form;
