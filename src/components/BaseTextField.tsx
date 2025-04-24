import React from 'react';
import {
  TextField,
  TextFieldProps,
  FormHelperText,
  FormControl,
} from "@mui/material";

export type TBaseTextField = Omit<TextFieldProps, 'error'> & {
  error?: string | boolean;
  inputTestId?: string;
  helperTextTestId?: string;
};

export const BaseTextField = React.forwardRef<
  HTMLDivElement,
  TBaseTextField
>(
  ({ error, inputTestId, helperTextTestId, ...props }, ref) => (
    <FormControl>
      <TextField
        slotProps={{
          input: { inputProps: { 'data-testid': inputTestId } }
        }}
        error={Boolean(error)}
        ref={ref}
        {...props}
      />
      {
        error &&
        <FormHelperText
          error
          data-testid={helperTextTestId}
        >{error}</FormHelperText>
      }
    </FormControl>
  )
);