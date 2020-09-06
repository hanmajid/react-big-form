import React from 'react';
import { defaultInputPropTypes, InputPropTypes } from '../my-prop-types';

const MyDefaultInput = (props) => {
  const {
    name,
    label,
    placeholder,
    type,
    value,
    onChange,
    error,
    disabled,
  } = props;

  const errorLabelId = `error-${name}`;

  return (
    <div style={{ marginBottom: 8 }}>
      <label htmlFor={name} style={{ display: 'block' }}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={onChange}
        disabled={disabled}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={errorLabelId}
      />
      <span id={errorLabelId} style={{ color: 'red', display: 'block' }}>
        {error}
      </span>
    </div>
  );
};

MyDefaultInput.propTypes = {
  ...InputPropTypes,
};

MyDefaultInput.defaultProps = {
  ...defaultInputPropTypes,
};

export default MyDefaultInput;
