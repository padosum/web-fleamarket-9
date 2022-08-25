import React, { useCallback, useEffect, useState } from 'react';

type FormInputValue = {
  [key: string]: string;
};

type FieldPropsValue = {
  name: string;
  value: string;
  onBlur: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  autoComplete: string;
};

const useForm = ({
  initialValues,
  validate,
  onSubmit,
}: {
  initialValues: FormInputValue;
  validate: (value: FormInputValue) => FormInputValue;
  onSubmit: any;
}) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<FormInputValue | {}>(
    {} as FormInputValue,
  );
  const [touched, setTouched] = useState<FormInputValue | {}>(
    {} as FormInputValue,
  );

  const getFieldProps = (name: string): FieldPropsValue => {
    const value = values[name];
    const onBlur = handleBlur;
    const onChange = handleChange;
    const autoComplete = 'new-password';

    return {
      name,
      value,
      onBlur,
      onChange,
      autoComplete,
    };
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    setValues({
      ...values,
      [target.name]: target.value,
    });
  };

  const handleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = e;

    setTouched({
      ...touched,
      [target.name]: true,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setTouched(
      Object.keys(values).reduce((touched: any, field: string) => {
        touched[field] = true;
        return touched;
      }, {}),
    );

    const errors = validate(values);
    setErrors(errors);
    if (Object.values(errors).some((v) => v)) {
      return;
    }

    onSubmit(values);
  };

  const runValidator = useCallback(() => validate(values), [values]);

  useEffect(() => {
    const errors = runValidator();
    setErrors(errors);
  }, [runValidator]);

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    getFieldProps,
  };
};

export default useForm;
