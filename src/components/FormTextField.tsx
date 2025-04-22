import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { BaseTextField } from './BaseTextField';
import type { TBaseTextField } from './BaseTextField';

type TFormTextField = {
  name: string;
} & TBaseTextField;

export const FormTextField: React.FC<TFormTextField> = ({
  name,
  helperText,
  defaultValue = "",
  ...otherProps
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={({ field, fieldState }) => (
        <BaseTextField
          fullWidth
          {...field}
          {...otherProps}
          error={fieldState.error?.message?.toString()}
          helperText={helperText}
        />
      )}
    />
  );
};