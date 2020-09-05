import React from 'react';
import { object, string } from 'yup';
import ReactBigForm from '@hanmajid/react-big-form';

const BasicExample = () => {
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
    alert('BasicExample form submitted!');
  };

  return (
    <ReactBigForm
      validationObject={object()}
      forms={forms}
      onSubmit={handleSubmit}
    />
  );
};

export default BasicExample;
