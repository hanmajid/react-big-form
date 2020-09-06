import React from 'react';
import PropTypes from 'prop-types';
// import { object } from 'yup';
import MyDefaultInput from './MyDefaultInput';
import ReactBigFormState from './ReactBigFormState';
import FormFieldPropTypes, { defaultFormFieldProps } from './prop-types';
import MyDefaultSelect from './MyDefaultSelect';

export const MyInput = React.forwardRef((props, ref) => {
  const {
    validationObject,
    name,
    label,
    initialValue,
    type,
    placeholder,
    validationSchema,
    syncOnChange,
    Component,
    dependencyFor,
    dependentTo,
    disabled,
    ...rest
  } = props;
  // console.log(`MyInput-${name}`);

  const [isSynced, setIsSynced] = React.useState(syncOnChange);
  const { state, dispatch } = React.useContext(ReactBigFormState);
  const otherValues = {};
  if (dependentTo.length > 0) {
    dependentTo.forEach((dv) => {
      if (dv in state) {
        otherValues[dv] = state[dv].value;
      }
    });
  }

  const [value, setValue] = React.useState(initialValue);
  const [touched, setTouched] = React.useState(false);
  const [error, setError] = React.useState('');
  const yupSchema = validationObject.shape({
    [name]: validationSchema,
  });

  const handleChange = (event) => {
    const newValue = event.target.value;
    setValue(newValue);
    if (!touched) {
      setTouched(true);
    }

    let newError = '';
    // console.log('validate', name);
    yupSchema.validate({ ...otherValues, [name]: newValue })
      .then(() => {
        setError('');
      })
      .catch((e) => {
        newError = e.message;
        setError(newError);
      })
      .finally(() => {
        if (syncOnChange) {
          dispatch({
            type: 'updateUnsync',
            key: name,
            value: {
              value: newValue,
              error: newError,
              dependencyFor,
            },
          });
        } else {
          setIsSynced(false);
        }
      });
  };

  React.useImperativeHandle(ref, () => ({
    isSynced() {
      return isSynced;
    },
    getValue(checkTouched = true) {
      if (checkTouched && touched) {
        return { name, value, error };
      }
      let newError = '';
      try {
        // console.log('validate', name);
        yupSchema.validateSync({ ...otherValues, [name]: value });
        newError = '';
      } catch (e) {
        // console.log(e);
        newError = e.message;
      }
      setError(newError);
      setIsSynced(true);
      return { name, value, error: newError };
    },
  }));

  let InputComponent;
  switch (type) {
    case 'select':
      InputComponent = MyDefaultSelect;
      break;
    default:
      InputComponent = Component || MyDefaultInput;
      break;
  }

  return (
    <InputComponent
      name={name}
      label={label}
      placeholder={placeholder}
      type={type}
      value={value}
      onChange={handleChange}
      error={error}
      disabled={disabled}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
    />
  );
});

export const MyInputPropTypes = {
  ...FormFieldPropTypes,

  // eslint-disable-next-line react/forbid-prop-types
  validationObject: PropTypes.object.isRequired,
  Component: PropTypes.elementType,
};

MyInput.propTypes = MyInputPropTypes;

MyInput.defaultProps = {
  ...defaultFormFieldProps,

  Component: undefined,
};
