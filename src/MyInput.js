import React from 'react';
import PropTypes from 'prop-types';
// import { object } from 'yup';
import MyDefaultInput from './MyDefaultInput';
import ReactBigFormState from './ReactBigFormState';

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

  const InputComponent = Component || MyDefaultInput;

  return (
    <InputComponent
      name={name}
      label={label}
      placeholder={placeholder}
      type={type}
      value={value}
      onChange={handleChange}
      error={error}
    />
  );
});

export const MyInputPropTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  validationObject: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  validationSchema: PropTypes.object.isRequired,
  initialValue: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  syncOnChange: PropTypes.bool,
  Component: PropTypes.elementType,
  dependencyFor: PropTypes.arrayOf(PropTypes.string),
  dependentTo: PropTypes.arrayOf(PropTypes.string),
};

MyInput.propTypes = MyInputPropTypes;

MyInput.defaultProps = {
  initialValue: '',
  placeholder: '',
  type: 'text',
  syncOnChange: false,
  Component: undefined,
  dependencyFor: [],
  dependentTo: [],
};
