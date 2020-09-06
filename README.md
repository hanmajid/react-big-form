# react-big-form

`react-big-form` is a React package for large controlled form validation. 

It was built with [`yup`](https://github.com/jquense/yup) in mind for form validation, but you can also use other methods if you want.

## Installation

Using npm:

```
$ npm i @hanmajid/react-big-form
```

## Usage

The default usage of `react-big-form` uses `yup` as form validator. Make sure to install `yup` in your project:

```
$ npm i yup
```

Here is an example of minimalistic login form using `react-big-form`.

```js
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

```

## Usage without `yup`

If you don't want to use `yup`, you can use custom form validator as shown in the code snippet below.

```js
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

```

## Props

Here's the list of `ReactBigForm` props:

| Props | Required? | Default | Description |
| --- | --- | --- | --- |
| `validationObject` | `true` | | `yup.object()` or custom form validator |
| `forms` | `true` | | List of form fields. See [Form Field Props](#form-field-props) below for reference. |
| `onSubmit(values)` | `true` | | This function is called when all form fields is valid |
| `Component` | `false` | `<input />` | Custom input element. See `examples` folder for reference. |
| `ButtonComponent` | `false` | `<button />` | Custom button element. See `examples` folder for reference. |
| `buttonDisabled` | `false` | `false` | If set to `true`, the submit button is disabled |

### Form Field Props

| Props | Required? | Default | Description |
| --- | --- | --- | --- |
| `name` | `true` | | Html input `name` property |
| `label` | `true` | | Form field label |
| `validationSchema` | `true` | | Form field validation schema (`yup` or custom). |
| `initialValue` | `false` | `''` | Form field initial value |
| `type` | `false` | `'text'` | Html input `type` property. Possible value: [`text`, `password`, `number`, `select`, `email`] |
| `placeholder` | `false` | `''` | Html input `placeholder` property |
| `disabled` | `false` | `false` | Html input `disabled` property |
| `dependencyFor` | `false` | `undefined` | List of other form fields that depends on this form field. If used, must also set `syncOnChange` as `true`. |
| `dependentTo` | `false` | `undefined` | List of other form fields that this form field depends on |
| `syncOnChange` | `false` | `false` | Must be set on `true` if form field is using `dependencyFor` |
| `options` | `false` | `[]` | List of options if `types` is set to `select`. Each option must have property of `label` and `value`. |
