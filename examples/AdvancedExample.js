import React from 'react';
import {
  object, ref, number, string, boolean,
} from 'yup';
import ReactBigForm from '@hanmajid/react-big-form';

const AdvancedExample = () => {
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const forms = [
    {
      name: 'username',
      label: 'Username',
      type: 'text',
      placeholder: 'Enter username',
      initialValue: 'hanmajid',
      validationSchema: string()
        .min(6, 'Username min. 6 characters')
        .required('Username is required'),
      disabled: isSubmitted,
    },
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      placeholder: 'Enter name',
      validationSchema: string().required('Name is required'),
      disabled: isSubmitted,
    },
    {
      name: 'avatar',
      label: 'Avatar',
      type: 'file',
      placeholder: 'Upload avatar',
      validationSchema: string().required('Avatar is required'),
      disabled: isSubmitted,
    },
    {
      name: 'birthDate',
      label: 'Birth Date',
      type: 'date',
      validationSchema: string().required('Birth date is required'),
      disabled: isSubmitted,
    },
    {
      name: 'birthTime',
      label: 'Birth Time',
      type: 'time',
      validationSchema: string().required('Birth time is required'),
      disabled: isSubmitted,
    },
    {
      name: 'birthDateTime',
      label: 'Birth Date & Time',
      type: 'datetime-local',
      validationSchema: string().required('Birth date & time is required'),
      disabled: isSubmitted,
    },
    {
      name: 'birthMonth',
      label: 'Birth Month',
      type: 'month',
      validationSchema: string().required('Birth month is required'),
      disabled: isSubmitted,
    },
    {
      name: 'phoneNumber',
      label: 'Phone Number',
      type: 'number',
      placeholder: 'Enter phone number',
      validationSchema: number().transform((value) => (isNaN(value) ? undefined : value)).positive('Phone number must be positive').required('Phone number is required'),
      disabled: isSubmitted,
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      placeholder: 'Enter email',
      validationSchema: string().email('Email is not valid').required('Email is required'),
      disabled: isSubmitted,
    },
    {
      name: 'bio',
      label: 'Bio',
      type: 'textarea',
      placeholder: 'Enter bio',
      validationSchema: string().required('Bio is required'),
      disabled: isSubmitted,
    },
    {
      name: 'gender',
      label: 'Gender',
      placeholder: 'Select a gender',
      type: 'select',
      options: [
        {
          label: 'Male',
          value: '0',
        },
        {
          label: 'Female',
          value: '1',
        },
      ],
      validationSchema: string().required('Gender is required'),
      disabled: isSubmitted,
    },
    {
      name: 'fruit',
      label: 'Favorite Fruit',
      type: 'radio',
      options: [
        {
          label: 'Banana',
          value: '0',
        },
        {
          label: 'Apple',
          value: '1',
        },
        {
          label: 'Orange',
          value: '2',
        },
      ],
      validationSchema: string().required('Favorite fruit is required'),
      disabled: isSubmitted,
    },
    {
      name: 'password',
      label: 'Password',
      type: 'password',
      placeholder: 'Enter password',
      dependencyFor: ['passwordConfirmation'],
      syncOnChange: true,
      validationSchema: string().required('Password is required'),
      disabled: isSubmitted,
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
      disabled: isSubmitted,
    },
    {
      name: 'agree',
      label: 'Agree with Terms of condition?',
      type: 'checkbox',
      validationSchema: boolean()
        .test(
          'test-agree',
          'You must agree to this document that you didn\'t read.',
          (value) => value === true,
        ),
      disabled: isSubmitted,
    },
  ];

  const handleSubmit = (values) => {
    console.log(values);
    setIsSubmitted(true);
    alert('AdvancedExample form submitted!');
  };

  return (
    <ReactBigForm
      validationObject={object()}
      forms={forms}
      onSubmit={handleSubmit}
      buttonDisabled={isSubmitted}
    />
  );
};

export default AdvancedExample;
