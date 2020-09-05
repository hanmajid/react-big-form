import React from 'react';
import { object, string } from 'yup';
import { TextField, Button } from '@material-ui/core';
import ReactBigForm from '@hanmajid/react-big-form';

const MaterialInput = (props) => {
  const {
    name,
    label,
    placeholder,
    type,
    value,
    onChange,
    error,
  } = props;

  return (
    <TextField
      fullWidth
      variant="outlined"
      id={name}
      name={name}
      type={type}
      label={label}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      error={error !== ''}
      helperText={error || undefined}
    />
  );
};

const MaterialButton = () => (
  <Button
    fullWidth
    type="submit"
    variant="contained"
    color="primary"
  >
    Submit
  </Button>
);

const CustomComponentExample = () => {
  const forms = [
    {
      name: 'email',
      label: 'Email',
      validationSchema: string().email('Email is not valid').required('Email is required'),
    },
    {
      name: 'password',
      label: 'Password',
      type: 'password',
      validationSchema: string().required('Password is required'),
    },
  ];

  const handleSubmit = (values) => {
    console.log(values);
    alert('CustomComponentExample form submitted!');
  };

  return (
    <ReactBigForm
      validationObject={object()}
      forms={forms}
      onSubmit={handleSubmit}
      Component={MaterialInput}
      ButtonComponent={MaterialButton}
    />
  );
};

export default CustomComponentExample;
