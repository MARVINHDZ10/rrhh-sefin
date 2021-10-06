import React from 'react';
import TextField from '@material-ui/core/TextField';
import '../css/Input.css';

export const Input = ({
  name,
  placeholder,
  value,
  error=null,
  onChange,
  type
}) => {

  return (
      <TextField
          id="outlined-basic"
          placeholder={placeholder}
          autoComplete='off'
          type={type}
          fullWidth variant="outlined"
          name={name}
          value={value}
          onChange={onChange}
      />
  )
}