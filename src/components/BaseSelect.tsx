import React from 'react';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  SelectProps,
} from '@mui/material';

type TOption = {
  label: string;
  value: string | number;
};

type TBaseSelectProps = Omit<SelectProps, 'onChange'> & {
  label?: string;
  options: TOption[];
  onChange: (value: string) => void;
};

export const BaseSelect: React.FC<TBaseSelectProps> = ({
  label,
  options,
  value,
  onChange,
  ...props
}) => {
  const handleChange = (event: SelectChangeEvent<unknown>) => {
    onChange(event.target.value as string);
  };

  const labelId = `${props.id || 'base-select'}-label`;

  return (
    <FormControl>
      {label && <InputLabel id={labelId}>{label}</InputLabel>}
      <Select
        labelId={labelId}
        value={value}
        onChange={handleChange}
        label={label}
        {...props}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
