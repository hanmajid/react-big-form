import React from 'react';
import ReactBigForm from '@hanmajid/react-big-form';

/**
 * This class must implement 2 methods:
 * - `validate()`
 * - `valdateSync()`
 */
class CustomValidator {
  constructor(schema) {
    this.schema = schema;
  }

  // Must return promise.
  validate(values) {
    const p = new Promise((resolve, reject) => {
      Object.entries(values).forEach(([key, value]) => {
        // Check if required
        if ('required' in this.schema[key]) {
          if (value === '') {
            reject(Error(this.schema[key].required));
          }
        }
        // Check if mustContainApple
        if ('mustContainApple' in this.schema[key]) {
          if (value.toLowerCase().indexOf('apple') === -1) {
            reject(Error(this.schema[key].mustContainApple));
          }
        }
        // Validation OK!
        resolve();
      });
    });
    return p;
  }

  // The same as `validationSync` but throws `Error`.
  validateSync(values) {
    Object.entries(values).forEach(([key, value]) => {
      // Check if required
      if ('required' in this.schema[key]) {
        if (value === '') {
          throw Error(this.schema[key].required);
        }
      }
      // Check if mustContainApple
      if ('mustContainApple' in this.schema[key]) {
        if (value.toLowerCase().indexOf('apple') === -1) {
          throw Error(this.schema[key].mustContainApple);
        }
      }
      // Validation OK!
    });
  }
}

/**
 * This object must implement 1 method:
 * - `shape()`
 */
const customValidation = {
  shape(schema) {
    return new CustomValidator(schema);
  },
};

const CustomValidationExample = () => {
  const forms = [
    {
      name: 'email',
      label: 'Email',
      validationSchema: {
        mustContainApple: 'Email must contain the word `apple`',
        required: 'Email is required',
      },
    },
    {
      name: 'password',
      label: 'Password',
      type: 'password',
      validationSchema: {
        required: 'Password is required',
      },
    },
  ];

  const handleSubmit = (values) => {
    console.log(values);
    alert('CustomValidationExample form submitted!');
  };

  return (
    <ReactBigForm
      validationObject={customValidation}
      forms={forms}
      onSubmit={handleSubmit}
    />
  );
};

export default CustomValidationExample;
