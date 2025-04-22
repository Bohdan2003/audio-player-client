
import React from 'react';
import {
  TextField,
  TextFieldProps
} from "@mui/material";

export type TBaseTextField = Omit<TextFieldProps, 'error'> & {
  error?: string | boolean;
  helperText?: string | React.ReactNode;
};

export const BaseTextField = React.forwardRef<HTMLDivElement, TBaseTextField>(
  ({ error, helperText, ...props }, ref) => (
    <TextField
      error={Boolean(error)}
      helperText={error || helperText}
      {...props}
      ref={ref}
    />
  )
);