import React from 'react';
import { object, ref, string } from 'yup';
import ReactBigForm from '@hanmajid/react-big-form';

const AdvancedExample = () => {
  const forms = [
    {
      name: 'username',
      label: 'Username',
      type: 'text',
      placeholder: 'Enter username',
      validationSchema: string()
        .min(6, 'Username min. 6 characters')
        .required('Username is required'),
    },
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      placeholder: 'Enter name',
      validationSchema: string().required('Name is required'),
    },
    {
      name: 'email',
      label: 'Email',
      type: 'text',
      placeholder: 'Enter email',
      validationSchema: string().email('Email is not valid').required('Email is required'),
    },
    {
      name: 'password',
      label: 'Password',
      type: 'password',
      placeholder: 'Enter password',
      dependencyFor: ['passwordConfirmation'],
      syncOnChange: true,
      validationSchema: string().required('Password is required'),
    },
    {
      name: 'passwordConfirmation',
      label: 'Password Confirmation',
      type: 'password',
      placeholder: 'Enter password confirmation',
      dependentTo: ['password'],
      validationSchema: string()
        .oneOf([ref('password'), null], 'Password confirmation must match')
        .required('Password confirmation is required'),
    },
  ];

  const handleSubmit = (values) => {
    console.log(values);
    alert('AdvancedExample form submitted!');
  };

  return (
    <ReactBigForm
      validationObject={object()}
      forms={forms}
      onSubmit={handleSubmit}
    />
  );
};

export default AdvancedExample;
