import React from 'react';
import { defaultInputPropTypes, InputPropTypes } from './prop-types';

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
    <div>
      <label htmlFor={name} style={{ display: 'block' }}>
        {label}
      </label>
      <input
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
