import React from 'react';
import { defaultInputPropTypes, InputPropTypes } from '../my-prop-types';

const MyDefaultTextArea = (props) => {
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
      <textarea
        id={name}
        name={name}
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
      <span id={errorLabelId} style={{ color: 'red', display: 'block' }}>
        {error}
      </span>
    </div>
  );
};

MyDefaultTextArea.propTypes = {
  ...InputPropTypes,
};

MyDefaultTextArea.defaultProps = {
  ...defaultInputPropTypes,
};

export default MyDefaultTextArea;
